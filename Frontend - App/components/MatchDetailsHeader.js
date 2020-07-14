import React from 'react';
import styled from 'styled-components/native';
import styles from '../styles';

const MatchDetailsHeader = ({ 
  homeTeam, awayTeam, goalsHomeTeam, goalsAwayTeam, elapsed, round, status 
}) => (
  <Container>
    <Head>
      <MatchRound>{round}</MatchRound>
      <Status>{status}</Status>
    </Head>
    <Wrapper>
      <TeamInfoWrapper align="left">
        <TeamLogo source={{ uri: homeTeam.logo }} />
        <TeamName>{homeTeam.team_name}</TeamName>
      </TeamInfoWrapper>
      <MatchInfo>
        <Elapsed>{elapsed + "'"}</Elapsed>
        <Score>{`${ goalsHomeTeam } - ${ goalsAwayTeam }`}</Score> 
      </MatchInfo>
      <TeamInfoWrapper align="right">
        <TeamLogo source={{ uri: awayTeam.logo }} />
        <TeamName>{awayTeam.team_name}</TeamName>
      </TeamInfoWrapper>
    </Wrapper>
    <Head><SubHeading>Match Highlights</SubHeading></Head>
  </Container>
);

const Head = styled.View`
  justify-content: center;
  align-items: center;
`;
const SubHeading = styled.Text`
  font-size: 16px;
`;
const MatchRound = styled.Text`
  font-size: 20px;
`;
const Status = styled.Text``;
const Score = styled.Text`
  font-size: 18px;
`;
const TeamLogo = styled.Image`
  height: 70px;
  width: 70px;
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
  border-radius: 5px;
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
const Text = styled.Text``;
const Container = styled.View`
  padding: 10px;
`;
export default MatchDetailsHeader;
