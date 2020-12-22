import React from 'react'; 
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../routes/Auth';
import SportsUpdate from '../routes/SportsUpdate';
import AddPost from '../routes/AddPost';
import UpdatePost from '../routes/UpdatePost';
import Superstars from '../routes/Superstars';
import AddSuperstar from '../routes/AddSuperstar';
import UpdateSuperstar from '../routes/UpdateSuperstar';

const LoggedInRoutes = () => {

  return (
    <Switch>
      <Route exact path="/" component={SportsUpdate} />
      <Route exact path="/sportsupdate/add" component={AddPost} />
      <Route exact path="/sportsupdate/:id" component={UpdatePost} />
      <Route exact path="/superstars" component={Superstars} />
      <Route exact path="/superstars/add" component={AddSuperstar} />
      <Route exact path="/superstars/:id" component={UpdateSuperstar} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRoutes = ({ isLoggedIn }) => isLoggedIn ? (
  <LoggedInRoutes />
) : (
  <LoggedOutRoutes />
);

export default AppRoutes;
