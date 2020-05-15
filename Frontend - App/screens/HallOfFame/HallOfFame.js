import React from 'react'
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import HallOfFameListItem from '../../components/HallOfFameListItem';
import constants from '../../constants';
import styles from '../../styles';

const HallOfFame = () => {

  return (
    <Container>
      <FlatList
        keyExtractor={item => item.id}
        data={People}
        contentContainerStyle={{ width: constants.width }}
        renderItem={({item}) => (
          <HallOfFameListItem {...item} />
        )}
      />
    </Container>
  )
}

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

export default HallOfFame;
