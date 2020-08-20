import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AuthCard from '../components/AuthCard';

const Auth = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.containerStyles} >
        <Container maxWidth="sm">
          <AuthCard />
        </Container>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  containerStyles: {
    display: 'flex', 
    flex: 1, 
    height: '100vh', 
    justifyItems: 'center', 
    alignItems: 'center'
  }
});

export default Auth;
