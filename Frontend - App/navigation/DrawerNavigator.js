import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import SportsUpdateNavigator from './SportsUpdateNavigator';
import SportsChatNavigator from './SportsChatNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { AntDesign, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import CompetitionsNavigator from './CompetitionsNavigator';
import Signin from '../screens/Signin/Signin';
import HallOfFameNavigator from './HallOfFameNavigator';
import styles from '../styles';

const DrawerNavigator = createDrawerNavigator({
  SportsUpdate: {
    screen: SportsUpdateNavigator,
    navigationOptions: {
      title: 'Sports Update',
      drawerIcon: ({ focused }) => (
        <FontAwesome 
          name="newspaper-o" 
          size={20} 
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
  Competitions: {
    screen: CompetitionsNavigator,
    navigationOptions: {
      title: 'Competitions',
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
  Signin: {
    screen: Signin,
    navigationOptions: {
      title: 'My Account',
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

export default createAppContainer(DrawerNavigator);
