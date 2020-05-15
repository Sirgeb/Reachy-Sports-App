import React from 'react'
import styled from 'styled-components/native';
import SportsChatListItem from '../../components/SportsChatListItem';
import styles from '../../styles';
import { FlatList } from 'react-native';
import constants from '../../constants';

const Container = styled.View` 
  margin: 10px;
  background-color: ${styles.white};
`;

const List = [{
  id: "0",
  title: "Football",
  source: require("../../assets/sports-chat/football-player.png"),
  route: "FootballChat"
}, {
  id: "1",
  title: "Golf",
  source: require("../../assets/sports-chat/golf.png"),
  route: "GolfChat"
},{
  id: "2",
  title: "Basket Ball",
  source: require("../../assets/sports-chat/basketball-player.png"),
  route: "BasketballChat"
}, {
  id: "3",
  title: "Boxers",
  source: require("../../assets/sports-chat/boxing-gloves.png"),
  route: "BoxersChat"
}, {
  id: "4",
  title: "Runners",
  source: require("../../assets/sports-chat/exercise.png"),
  route: "RunnersChat"
}]

const SportsChat = () => {

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={List}
        contentContainerStyle={{ width: constants.width }}
        renderItem={({item}) => (
          <SportsChatListItem {...item} />
        )}
      />
    </Container>
  )
}

export default SportsChat;
