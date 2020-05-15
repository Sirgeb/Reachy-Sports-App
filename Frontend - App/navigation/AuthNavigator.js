import { createStackNavigator } from "react-navigation-stack";
import Signin from '../screens/Signin/Signin';

const AuthNavigator = createStackNavigator({
  Signin
}, {
  initialRouteName: "Signin",
  headerMode: "none"
});

export default AuthNavigator;
