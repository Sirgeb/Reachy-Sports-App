import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';
import Welcome from '../screens/Welcome/Welcome';

const SwitchNavigator = createSwitchNavigator({
  Home: {
    screen: DrawerNavigator
  },
  Welcome: {
    screen: Welcome
  } 
}, {
  initialRouteName: `Welcome`
});

export default createAppContainer(SwitchNavigator);