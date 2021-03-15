import React, { PureComponent } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native';
import styles from '../styles';
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';

class HallOfFameListItem extends PureComponent {

  render() {
    const { navigation, description, category } = this.props;
    
    return (
      <Container onPress={() => navigation.navigate('SuperStarsList', { category, description })}>
        <MaterialCommunityIcons 
          name="star-circle" 
          size={20} 
          style={{ color: styles.orange }}
        />
        <Image 
          source={require('../assets/unknown-profile.png')}
          style={{ height: 70, width: 70}}
        />
        <Wrapper>
        <Text>{description}</Text>
        <MaterialCommunityIcons 
            name="chevron-right" 
            size={25} 
            style={{ color: styles.black, paddingHorizontal: 12 }}
          />
        </Wrapper>
      </Container>
    )
  }
}

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  margin-bottom: 1.5px;
  padding: 10px;
  height: 90px;
  width: 100%;
  border-left-width: 5px;
  border-left-color: ${styles.orange};
  border-style: solid;
`;
const Text = styled.Text`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default withNavigation(HallOfFameListItem);
