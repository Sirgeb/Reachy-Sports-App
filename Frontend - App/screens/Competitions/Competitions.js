import React from 'react'
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Leagues } from '../../rapidApi/array_of_leagues';
import constants from '../../constants';
import styles from '../../styles';
import ListItemOfLeagues from '../../components/ListItemOfLeagues';

const Competitions = () => {
  
  return (
    <FlatListContainer>
      <FlatList 
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={Leagues}
        contentContainerStyle={{ width: constants.width }}
        renderItem={(item) => <ListItemOfLeagues {...item} />}
      />
    </FlatListContainer>
  )
}

const FlatListContainer = styled.View` 
  margin: 10px;
  background-color: ${styles.white};
`;

export default Competitions;
