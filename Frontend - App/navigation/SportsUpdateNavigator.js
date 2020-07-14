import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SportsUpdate from '../screens/SportsUpdate/SportsUpdate';
import SportsUpdateDetail from '../screens/SportsUpdate/SportsUpdateDetail';
import styles from '../styles';
import ChatLink from '../components/ChatLink';
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
      headerRight: () => <ChatLink />
    }
  },
  SportsUpdateDetail: {
    screen: SportsUpdateDetail,
    navigationOptions: {
      headerTitle: () => (
        <HeaderTitle title="Sports Update" />
      )
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
