import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import { Leagues } from '../../rapidApi/array_of_leagues';
import constants from '../../constants';
import styles from '../../styles';
import ListItemOfLeagues from '../../components/ListItemOfLeagues';

const Competitions = () => {
  
  return (
    <View style={layout.container}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => {
          return (
            <View style={layout.lineSeperator} />
          )
        }}
        data={Leagues}
        contentContainerStyle={{ width: constants.width }}
        renderItem={(item) => <ListItemOfLeagues {...item} />}
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

export default Competitions;
