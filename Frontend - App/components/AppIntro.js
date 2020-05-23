import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';

import styles from '../styles';
 
const slides = [
  {
    key: '1',
    title: 'Reachy Sports',
    text: 'Brings You... Sports Update, Sports Chat,\n Matches and Hall of Fame \n  All in one App',
    image: require('../assets/all-in-one.jpg'),
    backgroundColor: '#abc',
  },
  { 
    key: '2',
    title: 'Sports Update',
    text: 'Catch sports updates live in the app \n as they come!',
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
 
const AppIntro = ({ navigation }) => {

  const renderItem = ({ item }) => {
    return (
      <Container backgroundColor={item.backgroundColor}>
        <Image resizeMode="contain" source={item.image} />
        <Title>{item.title}</Title>
        <Text>{item.text}</Text>
      </Container>
    );
  }

  const onDone = async () => {
    await AsyncStorage.setItem("intro", "shown");
    navigation.navigate('Home');
  }

  return (
    <AppIntroSlider 
      renderItem={renderItem} 
      data={slides} 
      onDone={onDone}
      showPrevButton={true}
    />
  )
};

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

export default withNavigation(AppIntro);
