import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import RecentMatches from '../screens/Competitions/Matches/RecentMatches';
import UpcomingMatches from '../screens/Competitions/Matches/UpcomingMatches';
import Standings from '../screens/Competitions/Matches/Standings';
import styles from '../styles';

const MatchesNavigator = createMaterialTopTabNavigator({
  RecentMatches: {
    screen: RecentMatches,
    navigationOptions: {
      title: "Matches"
    }
  },
  UpcomingMatches: {
    screen: UpcomingMatches,
    navigationOptions: {
      title: "Upcoming"
    }
  },
  Standings: {
    screen: Standings,
  }
}, {
  initialRouteName: "RecentMatches",
  tabBarOptions: {
    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: styles.white
    },
    style: {
      backgroundColor: styles.orange
    }
  }
});

export default MatchesNavigator;
