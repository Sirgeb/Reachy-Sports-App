import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { getMatchStatistics, getMatchEvents } from '../../../rapidApi/apiCalls';
import ListItemOfFixtureEvents from '../../../components/ListItemOfFixtureEvents';
import MatchDetailsHeader from '../../../components/MatchDetailsHeader';
import MatchDetailsFooter from '../../../components/MatchDetailsFooter';
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
    loading || events === undefined || stats === undefined || stats === {} ? (
      <ActivityIndicator 
        size={30} 
        style={{ 
          flex: 1, 
          justifyContent: 'center',
          alignItems: 'center'
        }} 
        color={styles.orange} 
      /> 
    )
     : 
    ( 
      !!events && !!stats && ( 
        <FlatListContainer>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return <MatchDetailsHeader { ...navigation.getParam("fixture") } />
            }}
            ListFooterComponent={() => {
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

export default MatchDetails;
