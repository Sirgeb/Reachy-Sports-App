import React from 'react'; 
import styled from 'styled-components/native';
import styles from '../styles';

const MatchDetailsFooter = ({ stats }) => {
  return (
    <Container>
      <Row>
        <HomeTeam></HomeTeam>
        <Heading>Match Statistics</Heading>
        <AwayTeam></AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Ball Possession"]['home']}</HomeTeam>
        <Text>Ball Possession</Text>
        <AwayTeam>{stats["Ball Possession"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Total Shots"]['home']}</HomeTeam>
        <Text>Total Shots</Text>
        <AwayTeam>{stats["Total Shots"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Shots on Goal"]['home']}</HomeTeam>
        <Text>Shots on Goal</Text>
        <AwayTeam>{stats["Shots on Goal"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Fouls"]['home']}</HomeTeam>
        <Text>Fouls</Text>
        <AwayTeam>{stats["Fouls"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Corner Kicks"]['home']}</HomeTeam>
        <Text>Corner Kicks</Text>
        <AwayTeam>{stats["Corner Kicks"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Offsides"]['home']}</HomeTeam>
        <Text>Offsides</Text>
        <AwayTeam>{stats["Offsides"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Yellow Cards"]['home']}</HomeTeam>
        <Text>Yellow Cards</Text>
        <AwayTeam>{stats["Yellow Cards"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{!stats["Red Cards"]['home'] ? "0" : stats["Red Cards"]['home']}</HomeTeam>
        <Text>Red Cards</Text>
        <AwayTeam>{!stats["Red Cards"]['away'] ? "0" : stats["Red Cards"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Goalkeeper Saves"]['home']}</HomeTeam>
        <Text>Goalkeeper Saves</Text>
        <AwayTeam>{stats["Goalkeeper Saves"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Passes accurate"]['home']}</HomeTeam>
        <Text>Passes Accurate</Text>
        <AwayTeam>{stats["Passes accurate"]['away']}</AwayTeam>
      </Row>
      <Row>
        <HomeTeam>{stats["Total passes"]['home']}</HomeTeam>
        <Text>Total Passes</Text>
        <AwayTeam>{stats["Total passes"]['away']}</AwayTeam>
      </Row>
    </Container> 
  )
}

const EmptyStatContainer = styled.View`
  flex: 1; 
  justify-content: center; 
  align-items: center;
`;
const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  border-bottom-width: 0.3px;
  border-bottom-color: ${styles.grey};
`;
const Heading = styled.Text`
  flex: 5;
  font-size: 16px;
  text-align: center;
`;
const Text = styled.Text`
  flex: 5;
  text-align: center;
`;
const HomeTeam = styled.Text`
  flex: 2;
  text-align: center;
  margin-left: 10px;
`; 
const AwayTeam = styled.Text`
  flex: 2;
  text-align: center;
  margin-right: 10px;
`;
const Container = styled.View`
  margin: 10px 0 20px 0;
`; 

export default MatchDetailsFooter;
 