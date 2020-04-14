import { createStackNavigator } from "react-navigation-stack";
import Signin from '../screens/Auth/Signin';

const AuthNavigation = createStackNavigator({
  Signin
}, {
  initialRouteName: "Signin",
  headerMode: "none",
});

export default AuthNavigation;
