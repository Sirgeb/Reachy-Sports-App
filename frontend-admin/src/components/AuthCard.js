import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RsLogo from '../assets/rs-logo.png';

const AuthCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.logoContainer}>
          <img src={RsLogo} alt="Reachy Sports" className={classes.logo} />
        </div>
        <Typography className={classes.info}>NB: THIS DOMAIN IS ONLY FOR REACHY SPORTS ADMIN </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined">
          Sign in with Google
        </Button>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 300,
    minWidth: 275,
  },
  logoContainer: {
    display: 'flex', 
    justifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 80
  },
  info: {
    marginTop: 20 
  }
});

export default AuthCard;
