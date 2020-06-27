import React, { useEffect } from 'react'
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import SportsChatListItem from '../../components/SportsChatListItem';
import styles from '../../styles';
import constants from '../../constants'; 
import withSuspense from '../../components/withSuspense';
import { useIsLoggedIn } from '../../AuthContext';

const GET_GROUPS = gql`
  query GET_GROUPS {
    getGroups {
      id
      name
      title
      icon
      route
      isParticipant
    }
  }
`;

const _GET_GROUPS = gql`
  query _GET_GROUPS {
    getGroups {
      id
      name
      title
      icon
      route
    }
  }
`;

const SportsChat = () => {
  const isLoggedIn = useIsLoggedIn();
  const { data, refetch } = useQuery(!!isLoggedIn ? GET_GROUPS : _GET_GROUPS, { suspend: true });

  useEffect(() => { 
    refetch()
  }, []);

  return (
    <Container> 
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={data && data.getGroups}
        contentContainerStyle={{ width: constants.width }}
        renderItem={({item}) => (
          <SportsChatListItem {...item} refetch={refetch} />
        )}
      />
    </Container>
  )
}

const Container = styled.View` 
  margin: 10px;
  background-color: ${styles.white};
`;

export default withSuspense(SportsChat);
