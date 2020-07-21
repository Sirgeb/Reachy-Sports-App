import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import SuperStarSearchPresenter from '../../../components/SuperStarSearchPresenter';
import SearchBar from '../../../components/SearchBar';
import styles from '../../../styles';
import constants from '../../../constants';

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

  constructor(props) { 
    super(props);
    const { navigation } = props; 
    this.state = {
      term: "", 
      shouldFetch: false
    }
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }

  onChange = text => {
    const { navigation } = this.props;
    this.setState({ 
      term: text,
      shouldFetch: false
    });
    navigation.setParams({
      term: text
    });
  }

  onSubmit = () => {
    this.setState({ shouldFetch: true });
  }

  render() {
    const { term, shouldFetch } = this.state;
    return (
        shouldFetch ? (
          <SuperStarSearchPresenter keyword={term} shouldFetch={shouldFetch} />
        ) : (
          <Container>
            <Image resizeMode="contain" source={require('../../../assets/file.png')} />
            <Text style={{ fontSize: 14, color: styles.darkGrey }}>Search for a Superstar</Text>
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
  height: ${`${constants.height / 4}px`};
  opacity: 0.5;
  margin-bottom: 20px;
`;

export default Search;
