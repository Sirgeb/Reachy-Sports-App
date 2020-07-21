import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getMatchStatistics, getMatchEvents } from '../../../rapidApi/apiCalls';
import ListItemOfFixtureEvents from '../../../components/ListItemOfFixtureEvents';
import MatchDetailsHeader from '../../../components/MatchDetailsHeader';
import MatchDetailsFooter from '../../../components/MatchDetailsFooter';
import Loader from '../../../components/Loader';
import constants from '../../../constants';
import styles from '../../../styles';

const MatchDetails = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(undefined);
  const [stats, setStats] = useState(undefined);
  const { fixture_id } = navigation.getParam("fixture");

  const fetch = async (fixtureId) => {
    try {
      setLoading(true);
      const stats = await getMatchStatistics(fixtureId);
      const events = await getMatchEvents(fixtureId);
      setStats(stats);
      setEvents(events);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch(fixture_id);
  }, []);

  const _renderItem = (item) => {
    return <ListItemOfFixtureEvents {...item} />
  }

  return (
    loading || events === undefined || stats === undefined ? (
      <Loader />
    )
     : 
    ( 
      events && stats && ( 
        <FlatListContainer>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return <MatchDetailsHeader { ...navigation.getParam("fixture") } />
            }}
            ListFooterComponent={() => {
              if (Object.keys(stats).length === 0) {
                return <EmptyStatContainer>
                  <Text>Match data is not available</Text>
                </EmptyStatContainer>
              }
              return <MatchDetailsFooter stats={{ ...stats }} />
            }}
            keyExtractor={(item, index) => index.toString()}
            data={events}
            contentContainerStyle={{width: constants.width }}
            renderItem={_renderItem}
          />
        </FlatListContainer>
      )
    )
  )
}

const FlatListContainer = styled.View`
  flex: 1;
  background-color: ${styles.white};
`;

const EmptyStatContainer = styled.View`
  flex: 1; 
  justify-content: center; 
  align-items: center;
`;

const Text = styled.Text``;

export default MatchDetails;
