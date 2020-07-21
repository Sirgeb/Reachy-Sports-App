import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { getStandings } from '../../../rapidApi/apiCalls';
import ListItemOfLeagueTable from '../../../components/ListItemOfLeagueTable';
import Status from '../../../components/Status';
import Loader from '../../../components/Loader';
import styles from '../../../styles';
import constants from '../../../constants';

const Standings = ({ navigation }) => {
  const [leagueTable, setLeagueTable] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const leagueId = navigation.getParam("id");

  const fetch = async (leagueId) => {
    try {
      setLoading(true);
      const standings = await getStandings(leagueId);
      setLeagueTable(standings);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch(leagueId);
  }, []);

  return (
    loading || leagueTable === undefined ? (
      <Loader />
    ) : leagueTable[0] === undefined ?
       <Status message="Oops! Not available yet" />
      :
    (
      <FlatListContainer>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{ flex: 1, 
              flexDirection: 'row', 
              backgroundColor: styles.grey, 
              height: 20
            }}>
              <Text style={{ flex: 0.6 }}>#</Text>
              <Text style={{ flex: 4 }}>Team</Text>
              <Text style={{ flex: 2 }}>Played</Text>
              <Text style={{ flex: 2 }}>GD</Text>
              <Text style={{ flex: 2 }}>Points</Text>
            </View>
          )}
          keyExtractor={item => item.team_id.toString()}
          data={leagueTable[0]}
          contentContainerStyle={{ width: constants.width }}
          renderItem={(item) => <ListItemOfLeagueTable {...item} />}
        />
      </FlatListContainer>
    )
  )
}

const FlatListContainer = styled.View` 
  flex: 1;
  padding: 10px;
  background-color: ${styles.white};
`;

export default Standings;
