import React from 'react';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import styles from '../styles';

const Icons = {
  "Premier League (England)": require("../assets/competition/Premier-league-England.jpg"),
  "Seria A (Italy)": require("../assets/competition/Logo-Serie-A-Italy.jpg"),
  "Championship (England)": require("../assets/competition/championship-england.jpg"),
  "UEFA Europa League": require("../assets/competition/uefa-europa-league.jpg"),
  "UEFA Championship": require("../assets/competition/UEFA-CHAMPIONS-LEAGUE.jpg"),
  "FA Cup (England)": require("../assets/competition/fa-cup-england.jpg"),
  "Liga 1 (France)": require("../assets/competition/liga-france.jpg"),
  "Coupe de France": require("../assets/competition/coupe-de-france.jpg"),
  "Bundesliga 1 (Germany)": require("../assets/competition/bundesliga-logo.png"),
  "Super Lig (Turkey)": require("../assets/competition/Super-lig-turkey.jpg"), 
  "Premeira Liga (Portugal)": require("../assets/competition/Primeira-Liga-portugal.jpg"),
  "Premiership (Scotland)": require("../assets/competition/Scotish-premiership.jpg")
}

const ListItemOfLeagues = ({ item: league, navigation }) => {

  return (
    <Container onPress={() => ( 
      navigation.navigate("Matches", { id: league.leagueId, title: league.name })
    )}>
      <Image 
        source={Icons[league.name]}
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

export default withNavigation(ListItemOfLeagues); 
