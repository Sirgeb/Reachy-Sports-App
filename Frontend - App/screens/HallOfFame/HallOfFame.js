import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import HallOfFameListItem from '../../components/HallOfFameListItem';
import constants from '../../constants';
import styles from '../../styles';

const HallOfFame = () => {

  return (
    <View style={layout.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={categories}
        ItemSeparatorComponent={() => {
          return (
            <View style={layout.lineSeperator} />
          )
        }}
        contentContainerStyle={{ width: constants.width }}
        renderItem={({item}) => (
          <HallOfFameListItem {...item} />
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


const categories = [{
  id: "0",
  description: "Basketball Superstars",
  category: "BASKETBALL"
}, {
  id: "1",
  description: "Boxing Superstars",
  category: "BOXING"
}, {
  id: "2",
  description: "Football Superstars",
  category: "FOOTBALL"
}, {
  id: "3",
  description: "Golf Superstars",
  category: "GOLF"
}, {
  id: "4",
  description: "Tennis Superstars",
  category: "TENNIS"
}, {
  id: "5",
  description: "Other Superstars",
  category: "ATHLETICS"
}];

export default HallOfFame;
