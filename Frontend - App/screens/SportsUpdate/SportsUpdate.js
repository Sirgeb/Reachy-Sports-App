import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import { FlatList, ActivityIndicator, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import gql from 'graphql-tag';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import SportsUpdateListItem from '../../components/SportsUpdateListItem';
import styles from '../../styles';
import constants from '../../constants';
import FeaturedPosts from '../../components/FeaturedPosts';
import NetworkError from '../../components/NetworkError';
import withSuspense from '../../components/withSuspense';

const GET_FEATURED_POSTS_AND_POST_CONNECTION = gql` 
  query GET_FEATURED_POSTS_AND_POST_CONNECTION($first: Int, $after: String) {
    featuredPosts {
      id 
      caption 
      image
    }
    postsConnection(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id 
          image 
          caption 
          category
          commentsCount
          createdAt
        }
      }
    }
  }
`;

const NEW_POST = gql`
  subscription {
    newPost {
      id 
    } 
  }
`;

const SportsUpdate = () => {
  const { data, error, refetch, fetchMore } = useQuery(
    GET_FEATURED_POSTS_AND_POST_CONNECTION, { variables: { first: 10 }, suspend: true });
  const { data: newPost } = useSubscription(NEW_POST);
  const [ refreshing, setRefreshing ] = useState(false);
  const networkState = useNetInfo();
  const postsMap = {};

  useEffect(() => {
    let mounted = true;
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable === false) {
        Toast.show("You're Offline, No Internet Connection", Toast.LONG);
      }
    });
    refresh();
    return () => {
      mounted = false;
      unsubscribe();
    }
  }, [newPost, networkState.isConnected]);

  const refresh = async (mounted) => {
    try {
      if (mounted) {
        setRefreshing(true); 
      }
      await refetch();
      if (mounted) {
        setRefreshing(false);
      }
    } catch(e) {
      console.log(e.message);
    } 
  }

  const _renderItem = ({ item }) => (
    <SportsUpdateListItem { ...item }/>
  );

  return (
    !data.postsConnection && networkState.isConnected === false ? (
      <NetworkError refresh={refresh} />
    ) : (
       <View style={layout.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <FeaturedPosts data={data && data.featuredPosts} />}
          ListFooterComponent={() => data.postsConnection.pageInfo.hasNextPage ? <ActivityIndicator color={styles.orange} size={25} /> : null}
          keyExtractor={item => item.id}
          data={data.postsConnection.edges.map(post => ({
            ...post.node
          })).filter(p => {
            if (postsMap[p.id]) {
              return false;
            } 
            postsMap[p.id] = 1;
            return true;
          })}
          contentContainerStyle={{ width: constants.width }}
          renderItem={_renderItem}
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReachedThreshold={1}
          onEndReached={() => {
            if (data.postsConnection.pageInfo.hasNextPage) {
              fetchMore({
                variables: {
                  after: data.postsConnection.pageInfo.endCursor
                }, 
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult ) return previousResult;
                  return {
                    featuredPosts: [
                      ...fetchMoreResult.featuredPosts
                    ],
                    postsConnection: {
                      __typename: 'postsConnection',
                      pageInfo: fetchMoreResult.postsConnection.pageInfo,
                      edges: [
                        ...previousResult.postsConnection.edges,
                        ...fetchMoreResult.postsConnection.edges,
                      ]
                    }
                  }
                }
              });
            }
          }}
        />
    </View> 
    )
  )
}

const layout = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    margin: 10,
    backgroundColor: styles.white
  }
});

export default withSuspense(SportsUpdate);
