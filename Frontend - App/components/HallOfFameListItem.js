import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native';
import styles from '../styles';
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';

const HallOfFameListItem = ({ navigation }) => {
  return (
    <Container onPress={() => navigation.navigate('Profile')}>
      <Image 
        source={require('../assets/unknown-profile.png')}
        style={{ height: 70, width: 70}}
      />
      <Wrapper>
        <Name>Ifeanyi Iheanoacho</Name>
        <MaterialIcons 
          name="stars" 
          style={{ color: styles.orange, marginHorizontal: 20 }} 
          size={26} 
        />
      </Wrapper>
    </Container>
  )
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
  height: 100px;
  width: 100%;
  border-bottom-width: 1px;
  border-left-width: 5px;
  border-bottom-color: ${styles.lightGrey};
  border-left-color: ${styles.orange};
  border-style: solid;
`;
const Name = styled.Text`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default withNavigation(HallOfFameListItem);
