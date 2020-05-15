import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import styles from '../styles';
import ProfileLink from '../components/ProfileLink';
import MenuLink from '../components/MenuLink';
import HeaderTitle from '../components/HeaderTitle';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

import SportsChat from '../screens/SportsChat/SportsChat';
import RunnersChat from '../screens/SportsChat/RunnersChat/RunnersChat';
import FootballChat from '../screens/SportsChat/FootballChat/FootballChat';
import BoxersChat from '../screens/SportsChat/BoxersChat/BoxersChat';
import BasketballChat from '../screens/SportsChat/BasketballChat/BasketballChat';
import GolfChat from '../screens/SportsChat/GolfChat/GolfChat';
import Participants from '../screens/SportsChat/Participants/Participants';

const ChatNavigator = createStackNavigator({
  SportsChat: {
    screen: SportsChat,
    navigationOptions: {
      headerLeft: () => <MenuLink />,
      headerTitle: () => (
        <HeaderTitle title="Sports Chat" />
      )
    }
  },
  FootballChat: {
    screen: FootballChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Football Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 15 }} />
        </TouchableOpacity>
      )
    })
  },
  GolfChat: {
    screen: GolfChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Golf Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 15 }} />
        </TouchableOpacity>
      )
    })
  },
  BasketballChat: {
    screen: BasketballChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Basketball Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 15 }} />
        </TouchableOpacity>
      )
    })
  },
  BoxersChat: {
    screen: BoxersChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Boxers Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 15 }} />
        </TouchableOpacity>
      )
    })
  },
  RunnersChat: {
    screen: RunnersChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Runners Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants')}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 15 }} />
        </TouchableOpacity>
      )
    })
  },
  Participants: {
    screen: Participants,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Participants"
    })
  }
},{
  mode: "modal",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: styles.orange,
    },
    headerTintColor: styles.white,
  }
});

export default ChatNavigator;
