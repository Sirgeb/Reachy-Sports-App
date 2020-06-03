import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import SportsUpdateListItem from '../../components/SportsUpdateListItem';
import styles from '../../styles';
import constants from '../../constants';
import withSuspense from '../../components/withSuspense';

const GET_POSTS = gql` 
  query {
    getPosts {
      id 
      image 
      caption 
      category
      commentsCount
      createdAt
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
  const { data, refetch } = useQuery(GET_POSTS, { suspend: true });
  const { data: newPost } = useSubscription(NEW_POST);

  useEffect(() => {
    refresh();
  }, [newPost]);
  
  const refresh = async () => {
    try {
      await refetch();
    } catch(e) {
      console.log(e.message);
    }
  }

  const _renderItem = ({ item }) => (
    <SportsUpdateListItem { ...item }/>
  );

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        initialNumToRender={10}
        data={data && data.getPosts}
        contentContainerStyle={{ width: constants.width }}
        renderItem={_renderItem}
      />
    </Container>
  )
}

const Container = styled.View`   
  margin: 10px;
  background-color: ${styles.white};
`;

export default withSuspense(SportsUpdate);
