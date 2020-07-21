import React from 'react'; 
import styled from 'styled-components/native';
import styles from '../styles';

const Status = ({ message }) => {

  return (
    <Container>
      <Image 
        source={require('../assets/not-available.gif')} 
        resizeMode="contain"
      />
      <Text>{message}</Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1; 
  justify-content: center; 
  align-items: center;
  background-color: ${styles.white};
`;
const Image = styled.Image`
  height: 50px;
  width: 50px;
`;
const Text = styled.Text``;

export default Status;
