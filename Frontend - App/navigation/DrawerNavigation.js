import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import SportsUpdateNavigator from './SportsUpdateNavigator';
import SportsChatNavigator from './SportsChatNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import MatchesNavigator from './MatchesNavigator';
import AuthNavigator from './AuthNavigator';
import HallOfFameNavigator from './HallOfFameNavigator';
import styles from '../styles';
import { Platform } from 'react-native';

const DrawerNavigation = createDrawerNavigator({
  SportsUpdate: {
    screen: SportsUpdateNavigator,
    navigationOptions: {
      title: 'Sports Update',
      drawerIcon: ({ focused }) => (
        <Ionicons 
          name={ 
            Platform.OS !== "android" ? 
            "md-football" : "ios-football"} 
          size={24} 
          color={focused ? `${styles.orange}` : `${styles.black}`}
        />
      ),
    }
  },
  SportsChat: {
    screen: SportsChatNavigator,
    navigationOptions: {
      title: 'Sports Chat',
      drawerIcon: ({ focused }) => (
        <AntDesign 
          name="message1" 
          size={20} 
          color={focused ? `${styles.orange}` : `${styles.black}`}
        />
      ),
    }
  },
  Matches: {
    screen: MatchesNavigator,
    navigationOptions: {
      title: 'Matches',
      drawerIcon: ({ focused }) => (
      <FontAwesome 
        name="trophy" 
        size={24} 
        color={focused ? `${styles.orange}` : `${styles.black}`}
        />
      ),
    }
  },
  HallOfFame: {
    screen: HallOfFameNavigator,
    navigationOptions: {
      title: 'Hall Of Fame',
      drawerIcon: ({ focused }) => (
        <MaterialIcons
          name="stars" 
          size={26} 
          color={focused ? `${styles.orange}` : `${styles.black}`}
        />
      )
    }
  },
  Auth: {
    screen: AuthNavigator,
    navigationOptions: {
      title: 'Sign in',
      drawerIcon: ({ focused }) => (
        <FontAwesome5 
          name="user-circle" 
          size={24} 
          color={focused ? `${styles.orange}` : `${styles.black}`}
        />
      )
    }
  }
}, {
  drawerType: "front",
  contentComponent: CustomDrawerContent,
  contentOptions: {
    activeTintColor: `${styles.orange}`,
  }
});

export default createAppContainer(DrawerNavigation);
