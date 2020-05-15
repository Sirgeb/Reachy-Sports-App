import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import styled from 'styled-components/native';
import styles from '../styles';
 
const slides = [
  {
    key: '1',
    title: 'Reachy Sports',
    text: 'Toggle to catch all',
    image: require('../assets/all-in-one.jpg'),
    backgroundColor: '#abc',
  },
  {
    key: '2',
    title: 'Sports Update',
    text: 'Catch sports updates live in the app',
    image: require('../assets/sports-update.jpg'),
    backgroundColor: '#abc',
  },
  {
    key: '3',
    title: 'Sports Chat',
    text: 'Share your opinion in sports by joining chats \n and lots more!',
    image: require('../assets/sports-chat.jpg'),
    backgroundColor: '#abc',
  }
];
 
const AppIntro = () => {

  const renderItem = ({ item }) => {
    return (
      <Container backgroundColor={item.backgroundColor}>
        <Image resizeMode="contain" source={item.image} />
        <Title>{item.title}</Title>
        <Text>{item.text}</Text>
      </Container>
    );
  }

  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // setShowRealApp(true);
  }

    return (
      <AppIntroSlider 
        renderItem={renderItem} 
        data={slides} 
        onDone={onDone}
        showPrevButton={true}
      />
    )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`;

const Image = styled.Image`
  width: 250px;
  height: 250px;
`;

const Title = styled.Text`
  font-size: 22px;
  margin-top: 10px;
  color: ${styles.dark};
`;

const Text = styled.Text`
  text-align: center;
  color: ${styles.dark};
`;

export default AppIntro;
