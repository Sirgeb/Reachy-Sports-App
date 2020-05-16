import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import styles from '../styles';
import SearchLink from '../components/SearchLink';
import MenuLink from '../components/MenuLink';
import HeaderTitle from '../components/HeaderTitle';

import HallOfFame from '../screens/HallOfFame/HallOfFame';
import Profile from '../screens/HallOfFame/Profile/Profile';
import Search from '../screens/HallOfFame/Search/Search';

const HallOfFameNavigator = createStackNavigator({
  HallOfFame: {
    screen: HallOfFame,
    navigationOptions: {
      headerLeft: () => <MenuLink />,
      headerTitle: () => (
        <HeaderTitle title="Hall Of Fame" />
      ),
      headerRight: () => <SearchLink />,
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle: () => (
        <HeaderTitle title="Profile" />
      )
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      headerLeft: () => null,
      headerRight: () => null
    }
  }
}, {
  initialRouteName: "HallOfFame",
  mode: "modal",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: styles.orange,
    },
    headerTintColor: styles.white,
  }
});

export default HallOfFameNavigator;