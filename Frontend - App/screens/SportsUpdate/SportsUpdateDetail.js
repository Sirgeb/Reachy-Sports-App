import React, { useRef, useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useQuery, useSubscription } from "react-apollo-hooks";
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { useNetInfo } from '@react-native-community/netinfo';
import SportsUpdateHeader from '../../components/SportsUpdateHeader';
import CommentsListOfPost from '../../components/CommentsListOfPost';
import NetworkError from '../../components/NetworkError';
import WriteCommentSectionOfPost from '../../components/WriteCommentSectionOfPost';
import withSuspense from '../../components/withSuspense';
import constants from '../../constants';
import styles from '../../styles';

const NEW_COMMENT = gql`
  subscription NEW_COMMENT($postId: ID!){
    newComment(postId: $postId) {
      id
    }
  }
`;

const GET_POST_AND_COMMENTS = gql` 
  query GET_POST_AND_COMMENTS($postId: ID!, $first: Int, $after: String) {
    getPost(postId: $postId) {
      id 
      caption 
      category
      description 
      image
      commentsCount
      createdAt
    }
    commentsConnection(postId: $postId, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges{
        node {
          id
          text 
          createdAt
          user {
            id
            name 
            avatar
          }
        }
      }
    }
  }
`;
 
const SportsUpdateDetail = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { data: newComment } = useSubscription(NEW_COMMENT, { variables: { postId: id } });
  const { data, error, refetch, fetchMore } = useQuery(GET_POST_AND_COMMENTS, { variables: { postId: id, first: 10 }, suspend: true });
  const networkState = useNetInfo();
  const flatListRef = useRef();
  const commentsMap = {};

  const refresh = async () => {
    try {
      await refetch();
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    refresh();
    if (newComment !== undefined) {
      if (data.commentsConnection.edges.length !== 0) {
         Alert.alert("Your comment is noted 😎 :)")
         flatListRef.current.scrollToIndex({ index: 0, animated: true });
      } else {
        Alert.alert("Your comment is noted 😎 :)")
      }
    }
    return () => {
      mounted = false;
    }
  }, [newComment, networkState.isConnected])

  if (!!error && networkState.isConnected === false) {
    return <NetworkError refresh={refresh} />
  }

  const post = data.getPost;
  const comments = data.commentsConnection.edges || [];

  const _renderItem = ({ item: comment }) => {
    return (
      <CommentsListOfPost comment={comment} />
    )
  }

  return (    
    <KeyboardAvoidingView style={layout.KAV}>
      <FlatList
        ListHeaderComponent={() => <SportsUpdateHeader {...post} />}
        keyExtractor={item => item.id}
        data={comments.map(comment => ({
          ...comment.node
        })).filter(c => {
          if (commentsMap[c.id]) {
            return false;
          }
          commentsMap[c.id] = 1;
          return true;
        })}
        ref={flatListRef}
        contentContainerStyle={{ width: constants.width }}
        renderItem={ _renderItem }
        onEndReachedThreshold={1}
        onEndReached={() => {
          if (data.commentsConnection.pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                after: data.commentsConnection.pageInfo.endCursor
              }, 
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult ) return previousResult;
                return {
                  getPost: {
                    __typename: "getPost",
                    ...fetchMoreResult.getPost
                  },
                  commentsConnection: {
                    __typename: 'commentsConnection',
                    pageInfo: fetchMoreResult.commentsConnection.pageInfo,
                    edges: [
                      ...previousResult.commentsConnection.edges,
                      ...fetchMoreResult.commentsConnection.edges,
                    ]
                  }
                }
              }
            });
          }
        }}
        ListFooterComponent={() => data.commentsConnection.pageInfo.hasNextPage ? (
          <ActivityIndicator color={styles.orange} size={25} /> 
        ) : null}
      />
      <WriteCommentSectionOfPost postId={id} navigation={navigation} />
    </KeyboardAvoidingView>
  )
}

const layout = StyleSheet.create({
  KAV: {
    flex: 1,
    alignItems: "center"
  }
});

export default withSuspense(withNavigation(SportsUpdateDetail));
