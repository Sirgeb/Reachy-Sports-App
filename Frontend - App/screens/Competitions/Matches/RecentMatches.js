import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getRecentLeagueFixtures } from '../../../rapidApi/apiCalls';
import ListItemOfMatches from '../../../components/ListItemOfMatches';
import Loader from '../../../components/Loader';
import Status from '../../../components/Status';
import constants from '../../../constants';
import styles from '../../../styles';

const RecentMatches = ({ navigation }) => {
  const [matches, setMatches] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const leagueId = navigation.getParam("id");

  useEffect(() => {
    let mounted = true;

    const fetch = async (leagueId) => {
      try {
        if (mounted) setLoading(true);
        const fixtures = await getRecentLeagueFixtures(leagueId);
        if (mounted) {
          setMatches(fixtures);
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      } 
    }

    fetch(leagueId);

    return () => {
      mounted = false
    }
  }, []);

  const _renderItem = (item) => {
    return <ListItemOfMatches {...item} />
  }

  return (
    loading || matches === undefined ? (
      <Loader />
    ) : matches[0] === undefined ?
       <Status message="Oops! No fixture yet" />
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
export default RecentMatches;
