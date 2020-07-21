import React from 'react'; 
import { FlatList } from 'react-native';   
import styled from 'styled-components/native'; 
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import HallOfFameSuperStarsListItem from './HallOfFameSuperStarsListItem';
import Loader from '../components/Loader';
import constants from '../constants';
import styles from '../styles';

const SEARCH_SUPERSTARS = gql` 
  query SEARCH_SUPERSTARS($keyword: String!) {
    searchSuperStars(keyword: $keyword) {
      id  
      fullname
      image
      dateOfBirth
      country
      category 
      bio
      updatedAt
    }
  }
`;

const SuperStarSearchPresenter = ({ keyword, shouldFetch }) => {
  const { data, loading } = useQuery(SEARCH_SUPERSTARS, 
    { 
      variables: { keyword }, 
      fetchPolicy: "network-only",
      skip: !shouldFetch
    }
  );

  if (loading) return <Loader />

  if (data.searchSuperStars[0] === undefined) {
    return (
    <Container>
      <Image resizeMode="contain" source={require('../assets/unknown-profile.png')} />
      <Text style={{ fontSize: 14, color: styles.darkGrey }}>Superstar not in our database</Text>
    </Container>
    )
  }

  const _renderItem = ({ item }) => {
    return <HallOfFameSuperStarsListItem superStar={{...item}} />
  }

  return ( 
    <Container>
      <FlatList
        keyExtractor={item => item.id}
        data={data && data.searchSuperStars}
        contentContainerStyle={{ width: constants.width }}
        renderItem={_renderItem}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center; 
  align-items: center;
  margin: 10px;
`;
const Image = styled.Image`
  width: ${`${constants.width - 40}px`};
  height: ${`${constants.height / 4}px`};
  opacity: 0.5;
  margin-bottom: 20px;
`;
const Text = styled.Text``;

export default SuperStarSearchPresenter; 
