import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native';
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';

const ParticipantsListItem = ({ fullname }) => {
  return (
    <Container>
      <Image 
        source={require('../assets/unknown-profile.png')}
        style={{ height: 70, width: 70}}
      />
      <Wrapper>
        <Name>{fullname}</Name>
        <AntDesign 
          name="user" 
          style={{ color: styles.orange, paddingHorizontal: 12 }} 
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
const Container = styled.View`
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

export default ParticipantsListItem;
