import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SportsChat from '../screens/SportsChat/SportsChat';
import styles from '../styles';
import ProfileLink from '../components/ProfileLink';
import MenuLink from '../components/MenuLink';
import HeaderTitle from '../components/HeaderTitle';

const ChatNavigator = createStackNavigator({
  SportsChat: {
    screen: SportsChat,
    navigationOptions: {
      headerLeft: () => <MenuLink />,
      headerTitle: () => (
        <HeaderTitle title="Sports Chat" />
      ),
      headerRight: () => <ProfileLink />,
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

export default ChatNavigator;
