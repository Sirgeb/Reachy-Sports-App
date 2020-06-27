import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import SportsUpdateListItem from '../../components/SportsUpdateListItem';
import styles from '../../styles';
import constants from '../../constants';
import withSuspense from '../../components/withSuspense';

const POSTS_CONNECTION = gql` 
  query POSTS_CONNECTION($first: Int, $after: String) {
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
  const { data, refetch, fetchMore } = useQuery(POSTS_CONNECTION, { variables: { first: 10 }, suspend: true });
  const { data: newPost } = useSubscription(NEW_POST);
  const [ refreshing, setRefreshing ] = useState(false);
  const postsMap = {};

  useEffect(() => {
    refresh();
  }, [newPost]);
  
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch(e) {
      console.log(e.message);
    } finally {
      setRefreshing(false);
    }
  }

  const _renderItem = ({ item }) => (
    <SportsUpdateListItem { ...item }/>
  );

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => data.postsConnection.pageInfo.hasNextPage ? <ActivityIndicator color={styles.orange} size={25} /> : null}
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
        keyExtractor={item => item.id}
        data={data && data.postsConnection.edges.map(post => ({
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
      />
    </Container>
  )
}

const Container = styled.View`   
  margin: 10px;
  background-color: ${styles.white};
`;

export default withSuspense(SportsUpdate);
