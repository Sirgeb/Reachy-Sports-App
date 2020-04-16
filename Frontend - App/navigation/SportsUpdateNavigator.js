import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SportsUpdate from '../screens/SportsUpdate/SportsUpdate';
import styles from '../styles';
import ProfileLink from '../components/ProfileLink';
import MenuLink from '../components/MenuLink';
import HeaderTitle from '../components/HeaderTitle';

const SportsNavigator = createStackNavigator({
  SportsUpdate: {
    screen: SportsUpdate,
    navigationOptions: {
      headerLeft: () => <MenuLink />,
      headerTitle: () => (
        <HeaderTitle title="Sports Update" />
      ),
      headerRight: () => <ProfileLink />
    }
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

export default SportsNavigator;
