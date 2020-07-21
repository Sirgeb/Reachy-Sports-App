import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import styles from '../styles';
import MenuLink from '../components/MenuLink';
import HeaderTitle from '../components/HeaderTitle';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

import SportsChat from '../screens/SportsChat/SportsChat';
import AthleticsChat from '../screens/SportsChat/AthleticsChat/AthleticsChat';
import FootballChat from '../screens/SportsChat/FootballChat/FootballChat';
import BoxersChat from '../screens/SportsChat/BoxersChat/BoxersChat';
import BasketballChat from '../screens/SportsChat/BasketballChat/BasketballChat';
import GolfChat from '../screens/SportsChat/GolfChat/GolfChat';
import Participants from '../screens/SportsChat/Participants/Participants';
import TennisChat from '../screens/SportsChat/TennisChat/TennisChat';

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
  AthleticsChat: {
    screen: AthleticsChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Athletics Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants', { groupId: navigation.getParam('groupId')})}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 20 }} />
        </TouchableOpacity>
      )
    })
  },
  FootballChat: {
    screen: FootballChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Football Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants', { groupId: navigation.getParam('groupId')})}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 20 }} />
        </TouchableOpacity>
      )
    })
  },
  GolfChat: {
    screen: GolfChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Golf Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants', { groupId: navigation.getParam('groupId')})}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 20 }} />
        </TouchableOpacity>
      )
    })
  },
  BasketballChat: {
    screen: BasketballChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Basketball Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants', { groupId: navigation.getParam('groupId')})}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 20 }} />
        </TouchableOpacity>
      )
    })
  },
  BoxersChat: {
    screen: BoxersChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Boxers Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants', { groupId: navigation.getParam('groupId')})}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 20 }} />
        </TouchableOpacity>
      )
    })
  },
  TennisChat: {
    screen: TennisChat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Tennis Chat",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Participants', { groupId: navigation.getParam('groupId')})}>
          <Feather name="users" size={25} style={{ color: styles.white, marginHorizontal: 20 }} />
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
