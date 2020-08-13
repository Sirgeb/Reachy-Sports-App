import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { FlatList, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useNetInfo } from '@react-native-community/netinfo';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import NetworkError from '../../../components/NetworkError';
import HallOfFameSuperStarsListItem from '../../../components/HallOfFameSuperStarsListItem';
import withSuspense from '../../../components/withSuspense';
import constants from '../../../constants';
import styles from '../../../styles';

const SUPER_STARS_CONNECTION = gql` 
  query SUPER_STARS_CONNECTION($first: Int, $after: String, $category: Category!) {
    superStarsConnection(first: $first, after: $after, category: $category) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id 
          fullname
          image 
          category
          country
          dateOfBirth
          bio
          updatedAt
        }
      }
    }
  }
`;

const SuperStarsList = ({ navigation }) => {
  const category = navigation.getParam("category");
  const { data, error, refetch, fetchMore } = useQuery(
    SUPER_STARS_CONNECTION, { variables: { first: 10,  category }, suspend: true });
  const networkState = useNetInfo();

  useEffect(() => {
    refresh();
  }, [networkState.isConnected]);

  const refresh = async () => {
    try {
      await refetch();
    } catch(e) {
      console.log(e.message);
    }
  }

  const superStarsMap = {};
  const _renderItem = ({ item }) => (
    <HallOfFameSuperStarsListItem superStar={{...item}} />
  );

  if (!!error && networkState.isConnected === false) {
    return <NetworkError refresh={refresh} />
  }

  if (data.superStarsConnection.edges[0] === undefined) {
    return (
    <Container>
      <Image resizeMode="contain" source={require('../../../assets/unknown-profile.png')} />
      <Text style={{ fontSize: 14, color: styles.darkGrey }}>No Superstar on this list</Text>
    </Container>
    )
  }

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={data && data.superStarsConnection.edges.map(superStars => ({
          ...superStars.node
        })).filter(p => {
          if (superStarsMap[p.id]) {
            return false;
          } 
          superStarsMap[p.id] = 1;
          return true;
        })}
        contentContainerStyle={{ width: constants.width }}
        ListFooterComponent={() => data.superStarsConnection.pageInfo.hasNextPage ? (
          <ActivityIndicator color={styles.orange} size={25} />
         ) : null}
        renderItem={_renderItem}
        onEndReachedThreshold={1}
        onEndReached={() => {
          if (data.superStarsConnection.pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                after: data.superStarsConnection.pageInfo.endCursor
              }, 
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult ) return previousResult;
                return {
                  superStarsConnection: {
                    __typename: 'superStarsConnection',
                    pageInfo: fetchMoreResult.superStarsConnection.pageInfo,
                    edges: [
                      ...previousResult.superStarsConnection.edges,
                      ...fetchMoreResult.superStarsConnection.edges,
                    ]
                  }
                }
              }
            });
          }
        }}
      />
    </Container>
  )
}

const Container = styled.View` 
  flex: 1;
  justify-content: center; 
  align-items: center;
  margin: 10px;
  background-color: ${styles.white};
`;
const Image = styled.Image`
  width: ${`${constants.width - 40}px`};
  height: ${`${constants.height / 4}px`};
  opacity: 0.5;
  margin-bottom: 20px;
`;
const Text = styled.Text``;
export default withSuspense(withNavigation(SuperStarsList));
