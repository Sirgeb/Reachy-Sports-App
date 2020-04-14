import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TabNavigation from './TabNavigation';
import AuthNavigation from './AuthNavigation';

const MainNavigation = createStackNavigator({
  TabNavigation,
  AuthNavigation
},{
  initialRouteName: "TabNavigation",
  headerMode: "none",
  mode: "modal"
});

export default createAppContainer(MainNavigation);
