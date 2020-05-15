import React from 'react'
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import ParticipantsListItem from '../../../components/ParticipantsListItem';
import styles from '../../../styles';
import constants from '../../../constants';

const Container = styled.View` 
  margin: 10px;
  background-color: ${styles.white};
`;

const People = [{
  id: "0",
  fullname: "Chinedu Orji"
}, {
  id: "1",
  fullname: "ifeanyi Okorie"
}]

const Participants = () => {
  return (
    <Container>
      <FlatList
        keyExtractor={item => item.id}
        data={People}
        contentContainerStyle={{ width: constants.width }}
        renderItem={({item}) => (
          <ParticipantsListItem {...item} />
        )}
      />
    </Container>
  )
}

export default Participants;

