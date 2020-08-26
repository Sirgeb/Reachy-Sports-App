import React from 'react';
import { Router } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'
import history from './History';
import AppRoutes from './AppRoutes';

const IS_LOGGED_IN = gql`
  query IS_LOGGED_IN {
    isLoggedIn @client
  }
`;

const App = () => {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);

  return (
    <Router history={history}>
      <AppRoutes isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
