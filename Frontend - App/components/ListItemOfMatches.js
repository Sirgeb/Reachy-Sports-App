import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import moment from 'moment';
import styles from '../styles';

class ListItemOfMatches extends PureComponent {
  render() {
    const { 
      fixture_id, 
      elapsed,
      event_date,
      goalsHomeTeam,
      goalsAwayTeam,
      homeTeam,
      awayTeam,
    } = this.props.item; 
    const { upcomingMatches, navigation } = this.props;
    
    return (
      <Container onPress={() => {
        !upcomingMatches ? navigation.navigate("Statistics", { fixture: { ...this.props.item }}) : null
      }}>
        <Date>{moment(event_date).format('MMMM Do YYYY, HH:mm')} (GMT + 1)</Date> 
        <Wrapper>
          <TeamInfoWrapper align="left">
            <TeamLogo source={{ uri: homeTeam.logo }} />
            <TeamName>{homeTeam.team_name}</TeamName>
          </TeamInfoWrapper>
          <MatchInfo>
            <Elapsed>{elapsed + "'"}</Elapsed>
            { upcomingMatches ? <Score> 0 - 0 </Score> : <Score>{`${!goalsHomeTeam ? "0" : goalsHomeTeam} - ${!goalsAwayTeam ? "0" : goalsAwayTeam }`}</Score> }
            { upcomingMatches ? <ViewStat> Not Started </ViewStat> : <ViewStat>Match Details</ViewStat>}
          </MatchInfo>
          <TeamInfoWrapper align="right">
            <TeamLogo source={{ uri: awayTeam.logo }} />
            <TeamName>{awayTeam.team_name}</TeamName>
          </TeamInfoWrapper>
        </Wrapper>
      </Container>
    )
  }
}

const Container = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGrey};
`;
const Date = styled.Text``;
const Score = styled.Text``;
const TeamLogo = styled.Image`
  height: 50px;
  width: 50px;
`;
const TeamName = styled.Text`
  font-size: 12px;
`;
const Elapsed = styled.Text``;
const TeamInfoWrapper = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
const ViewStat = styled.Text`
  color: ${styles.white};
  background-color: ${styles.orange};
  padding: 2px 5px;
  font-size: 12px;
`;
const MatchInfo = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center; 
`;
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default withNavigation(ListItemOfMatches);
