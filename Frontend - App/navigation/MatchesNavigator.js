import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import Matches from '../screens/Matches/Matches';
import styles from '../styles';
import ProfileLink from '../components/ProfileLink';
import MenuLink from '../components/MenuLink';
import HeaderTitle from '../components/HeaderTitle';

const MatchesNavigator = createStackNavigator({
  Matches: {
    screen: Matches,
    navigationOptions: {
      headerLeft: () => <MenuLink />,
      headerTitle: () => (
        <HeaderTitle title="Matches" />
      ),
      headerRight: () => <ProfileLink />,
    }
  }
}, {
  initialRouteName: "Matches",
  mode: "modal",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: styles.orange,
    },
    headerTintColor: styles.white,
  }
});

export default MatchesNavigator;
