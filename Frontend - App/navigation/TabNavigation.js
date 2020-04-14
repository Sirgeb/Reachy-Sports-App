import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SportsFeed from '../screens/Tabs/SportsFeed';
import SportsChat from '../screens/Tabs/SportsChat';
import Matches from '../screens/Tabs/Matches';

import { FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text } from 'react-native';

import styles from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileLink from '../components/ProfileLink';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.orange 
         }
      }
    }
  );

const Header = {
  headerTitle: () => (
    <Text style={{ color: styles.white, fontSize: 20, marginHorizontal: 10}}>Reachy Sports</Text>
  ),
  headerRight: () => (
    <ProfileLink />
  ),
};

const TabNavigation = createBottomTabNavigator(
  {
    SportsFeed: {
      screen: stackFactory(SportsFeed, {
        ...Header
      }), 
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <FontAwesome5 name="list-alt" size={25} color={focused ? styles.orange : styles.white}/>
        ),
        tabBarOptions: {
          activeTintColor: 'white',
          inactiveTintColor: '#F58634',
          labelStyle: {
            fontSize: 12
          },
          style: {
            backgroundColor: 'teal',
          }
        }
      }
    },
    SportsChat: {
      screen: stackFactory(SportsChat, {
        ...Header
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <AntDesign name="message1" size={25} color={focused ? styles.orange : styles.white}/>
        ),
        tabBarOptions: {
          activeTintColor: styles.white,
          inactiveTintColor: styles.orange,
          labelStyle: {
            fontSize: 12
          },
          style: {
            backgroundColor: styles.teal,
          }
        }
      }
    },
    Matches: {
      screen: stackFactory(Matches, {
        ...Header
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons name="star-box" size={30} color={focused ? styles.orange : styles.white}/>
        ),
        tabBarOptions: {
          activeTintColor: styles.white,
          inactiveTintColor: styles.orange,
          labelStyle: {
            fontSize: 12
          },
          style: {
            backgroundColor: styles.teal,
          }
        }
      }
    }
  },
  {
    initialRouteName: "SportsFeed",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: styles.orange
      }
    }
  }
);

export default TabNavigation;
