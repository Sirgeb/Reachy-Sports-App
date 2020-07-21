import React, { PureComponent } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native';
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { formatLetters } from '../utils'; 
import styles from '../styles';

class HallOfFameSuperStarsListItem extends PureComponent {

  render() {
    const { navigation, superStar, item } = this.props;
    const { fullname, image } = superStar;

    return (
      <Container onPress={() => navigation.navigate('Profile', { superStar })}>
        <MaterialCommunityIcons 
          name="star-circle" 
          size={20} 
          style={{ color: styles.orange }}
        />
        <Image 
          source={{ uri: image }}
          style={{ height: 70, width: 70, borderRadius: 35, backgroundColor: styles.lightGrey }}
        />
        <Wrapper>
          <Name> {formatLetters(fullname)} </Name>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={25} 
            style={{ paddingHorizontal: 12 }}
          />
        </Wrapper>
      </Container>
    )
  }
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  margin-bottom: 1.5px;
  padding: 10px;
  height: 90px;
  width: 100%;
  border-bottom-width: 1px;
  border-left-width: 5px;
  border-bottom-color: ${styles.lightGrey};
  border-left-color: ${styles.orange};
  border-style: solid;
`;
const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Text = styled.Text`
  color: ${styles.white};
`;

const Name = styled.Text`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default withNavigation(HallOfFameSuperStarsListItem);
