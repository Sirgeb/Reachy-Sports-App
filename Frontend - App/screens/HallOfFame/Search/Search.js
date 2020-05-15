import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import HallOfFameListItem from '../../../components/HallOfFameListItem';
import SearchBar from '../../../components/SearchBar';
import styles from '../../../styles';
import constants from '../../../constants';

const People = [{
  id: "0",
  fullname: "Chinedu Orji"
}, {
  id: "1",
  fullname: "ifeanyi Okorie"
}]

class Search extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <View style={{ flex: 1}}>
         <SearchBar 
            value={navigation.getParam("term", "" )} 
            onChange={navigation.getParam("onChange", () => null)} 
            onSubmit={navigation.getParam("onSubmit", () => null)} 
          />
          <Ionicons 
            name="md-search" 
            size={25} 
            color={styles.darkGrey}
            style={{ 
              position: "absolute", 
              right: 5, 
              top: 5
            }}
          />
      </View>
    )
  }); 

  render() {
    const search = false;

    return (
        search ? (
          <Container search>
            <FlatList
              keyExtractor={item => item.id}
              data={People}
              contentContainerStyle={{ width: constants.width }}
              renderItem={({item}) => (
                <HallOfFameListItem {...item} />
              )}
            />
        </Container>
        ) : (
          <Container>
            <Image resizeMode="contain" source={require('../../../assets/file.png')} />
            <Text style={{ fontSize: 14, color: styles.darkGrey }}>Search for a Profile </Text>
          </Container>
        )
    )
  }
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: ${props => props.search ? '10px': '0px'};
`;

const Image = styled.Image`
  width: ${`${constants.width - 40}px`};
  height: ${`${constants.height / 3.5}px`};
  opacity: 0.5;
`;

export default Search;
