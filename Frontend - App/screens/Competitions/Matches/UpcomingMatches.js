import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import ListItemOfMatches from '../../../components/ListItemOfMatches';
import { getUpcomingLeagueFixtures } from '../../../rapidApi/apiCalls';
import styles from '../../../styles';
import constants from '../../../constants';

const UpcomingMatches = ({ navigation }) => {

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const leagueId = navigation.getParam("id");

  const fetch = async (leagueId) => {
    try {
      setLoading(true);
      const fixtures = await getUpcomingLeagueFixtures(leagueId);
      setMatches(fixtures);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch(leagueId);
  }, []);

  const _renderItem = (item) => {
    return <ListItemOfMatches {...item} upcomingMatches={true} />
  }

  return (
    loading ? (
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
      <FlatListContainer>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={matches}
          contentContainerStyle={{ width: constants.width }}
          renderItem={_renderItem}
        />
      </FlatListContainer>
    )
  )
}

const FlatListContainer = styled.View` 
  flex: 1;
  background-color: ${styles.white};
`;
const Text = styled.Text``;

export default UpcomingMatches;
