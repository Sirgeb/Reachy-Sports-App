import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

class ListItemOfLeagueTable extends PureComponent {
  render() {
    const { rank, teamName, all, points, goalsDiff } = this.props.item;
    return (
      <View style={{ 
        flex: 1, 
        flexDirection: 'row', 
        backgroundColor: this.props.index % 2 === 0 ? styles.white : styles.grey, 
        height: 20
      }}>
        <Text style={{ flex: 0.6 }}>{rank}</Text>
        <Text style={{ flex: 4 }}>{teamName}</Text>
        <Text style={{ flex: 2 }}>{all.matchsPlayed}</Text>
        <Text style={{ flex: 2 }}>{goalsDiff}</Text>
        <Text style={{ flex: 2 }}>{points}</Text>
      </View>
    )
  }
}

export default ListItemOfLeagueTable;
