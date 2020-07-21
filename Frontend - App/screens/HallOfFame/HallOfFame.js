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
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={categories}
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

const categories = [{
  id: "0",
  description: "Basketball Superstars",
  category: "BASKETBALL"
}, {
  id: "1",
  description: "Boxing Superstars",
  category: "BOXING"
}, {
  id: "2",
  description: "Football Superstars",
  category: "FOOTBALL"
}, {
  id: "3",
  description: "Golf Superstars",
  category: "GOLF"
}, {
  id: "4",
  description: "Tennis Superstars",
  category: "TENNIS"
}, {
  id: "5",
  description: "Other Superstars",
  category: "ATHLETICS"
}];

export default HallOfFame;
