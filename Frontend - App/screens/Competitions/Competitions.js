import React from 'react'
import { FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { Leagues } from './array_of_leagues';
import constants from '../../constants';
import styles from '../../styles';

const Competitions = ({ navigation }) => {
  
  const ListOfLeagues = ({ item: league }) => {

    return (
      <Container onPress={() => navigation.navigate("Matches", { id: league.leagueId, title: league.name })}>
        <Image 
          source={{ uri: league.logo }}
          style={{ height: 70, width: 70, backgroundColor: styles.lightGrey }}
        /> 
        <Wrapper>
          <Name>{league.name}</Name>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={25} 
            style={{ color: styles.black, paddingHorizontal: 12 }}
          />
        </Wrapper>
      </Container>
    )
  }

  return (
    <FlatListContainer>
      <FlatList 
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={Leagues}
        contentContainerStyle={{ width: constants.width }}
        renderItem={ListOfLeagues}
      />
    </FlatListContainer>
  )
}

const FlatListContainer = styled.View` 
  margin: 10px;
  background-color: ${styles.white};
`;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  margin-bottom: 1.5px;
  padding: 10px;
  height: 90px;
  width: 100%;
  border-bottom-width: 1px;
  border-left-width: 5px;
  border-bottom-color: ${styles.lightGrey};
  border-left-color: ${styles.orange};
  border-style: solid;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Name = styled.Text`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default Competitions;
