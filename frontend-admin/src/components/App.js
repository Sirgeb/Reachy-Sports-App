import React from 'react';
import { Router } from 'react-router-dom';
import history from './History';
import AppRoutes from './AppRoutes';

const App = () => {

  return (
    <Router history={history}>
      <AppRoutes isLoggedIn={false} />
    </Router>
  );
}

export default App;
