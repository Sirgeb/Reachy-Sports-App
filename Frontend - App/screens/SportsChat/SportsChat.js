import React, { useEffect } from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import SportsChatListItem from '../../components/SportsChatListItem';
import NetworkError from '../../components/NetworkError';
import styles from '../../styles';
import constants from '../../constants'; 
import withSuspense from '../../components/withSuspense';
import { useIsLoggedIn } from '../../AuthContext';

const GET_GROUPS = gql`
  query GET_GROUPS {
    getGroups {
      id 
      name
      title
      icon
      route
      isParticipant
    }
  }
`;

const _GET_GROUPS = gql`
  query _GET_GROUPS {
    getGroups {
      id
      name
      title
      icon
      route
    }
  }
`;

const SportsChat = () => {
  const isLoggedIn = useIsLoggedIn();
  const { data, error, refetch } = useQuery(!!isLoggedIn ? GET_GROUPS : _GET_GROUPS, { fetchPolicy: 'cache-and-network'});
  const networkState = useNetInfo();

  const refresh = async () => {
    try {
      await refetch()
    } catch (e) {
      console.log(e.message); 
    }
  }

  useEffect(() => { 
    refresh()
  });

  if (!!error && networkState.isConnected === false) {
    return <NetworkError />
  }

  return (
    <View style={layout.container}> 
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={data.getGroups}
        ItemSeparatorComponent={() => {
          return (
            <View style={layout.lineSeperator} />
          )
        }}
        contentContainerStyle={{ width: constants.width }}
        renderItem={({item}) => (
          <SportsChatListItem {...item} refetch={refetch} />
        )}
      />
    </View>
  )
}

const layout = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
    paddingBottom: 10,
    backgroundColor: styles.white
  },
  lineSeperator: {
    width: '100%', 
    height: 1.5, 
    backgroundColor: styles.lightGrey
  }
});

export {
  GET_GROUPS
}
export default withSuspense(SportsChat);
