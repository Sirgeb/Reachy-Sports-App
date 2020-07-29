import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import Competitions from '../screens/Competitions/Competitions';
import MatchesNavigator from './MatchesNavigator';
import MatchDetails from '../screens/Competitions/Matches/MatchDetails';
import MenuLink from '../components/MenuLink';
import HeaderTitle from '../components/HeaderTitle';
import NavigationIcons from '../components/NavigationIcons';
import styles from '../styles';

const CompetitionsNavigator = createStackNavigator({
  Competitions: {
    screen: Competitions,
    navigationOptions: {
      headerLeft: () => <MenuLink />,
      headerTitle: () => (
        <HeaderTitle title="Competitions" />
      ),
      headerRight: () => <NavigationIcons route="Competitions" />
    }
  }, 
  Matches: {
    screen: MatchesNavigator,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("title")
    })
  },
  Statistics: {
    screen: MatchDetails,
    navigationOptions: {
      title: "Match Details"
    }
  }
}, {
  initialRouteName: "Competitions",
  mode: "modal",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: styles.orange,
      elevation: 0, 
      shadowOpacity: 0,
    },
    headerTintColor: styles.white,
  }
});

export default CompetitionsNavigator;
