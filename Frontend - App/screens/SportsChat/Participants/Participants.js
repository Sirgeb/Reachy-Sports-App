import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import ParticipantsListItem from '../../../components/ParticipantsListItem';
import withSuspense from '../../../components/withSuspense';
import styles from '../../../styles';
import constants from '../../../constants';

const GET_PARTICIPANTS = gql`
  query GET_PARTICIPANTS($groupId: ID!) {
    getParticipants(groupId: $groupId) {
      id 
      user {
        name
        avatar
      }
    }
  }
`;

const Participants = ({ navigation }) => {
  const groupId = navigation.getParam('groupId');
  const { data } = useQuery(GET_PARTICIPANTS, { variables: { groupId }, suspend: true });

  return ( 
    <Container>
      <FlatList
        keyExtractor={item => item.id}
        data={data.getParticipants}
        contentContainerStyle={{ width: constants.width }}
        renderItem={({item}) => (
          <ParticipantsListItem {...item} />
        )}
      />
    </Container>
  )
}

const Container = styled.View` 
  margin: 10px;
  background-color: ${styles.white};
`;

export default withSuspense(withNavigation(Participants));
