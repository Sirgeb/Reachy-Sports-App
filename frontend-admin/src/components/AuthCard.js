import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import RsLogo from '../assets/rs-logo.png';

const GET_GOOGLE_AUTH_URL = gql` 
  query GET_GOOGLE_AUTH_URL {
    getGoogleAuthUrl
  }
`;

const LOGIN_USER_VIA_GOOGLE = gql`
  mutation LOGIN_USER_VIA_GOOGLE($code: String!, $domain: String) {
    loginUserViaGoogle(code: $code, domain: $domain)
  }
`;

const LOCAL_LOGIN = gql`
  mutation logUserIn {
    logUserIn @client
  }
`;

const AuthCard = () => {
  const client = useApolloClient();
  const [logUserIn] = useMutation(LOCAL_LOGIN, { onCompleted: () => {
    toast.success("Success!", { autoClose: 5000, className: 'toastify-success' });
  }});
  const [loginUserViaGoogle, { loading, error }] = useMutation(LOGIN_USER_VIA_GOOGLE, {
    onCompleted: (data) => {
      const token = data.loginUserViaGoogle;
      if (token !== "" && token !== undefined) { 
        localStorage.setItem("token", token);
        logUserIn();
      }
    }
  });
  const logInRef = useRef(loginUserViaGoogle);
  const classes = useStyles();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      logInRef.current({
        variables: {
          code,
          domain: "admin"
        }
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query({
        query: GET_GOOGLE_AUTH_URL
      });
      window.location.href = data.getGoogleAuthUrl;
    } catch (e) {
      toast.error("Sorry! We weren't able to log you in. Please try again later", { autoClose: 5000 });
    }
  }

  if (error) {
    toast.error("Error! You are not authorized to access this domain", { autoClose: 5000 });
  }

  if (loading) {
    toast.info("Please Wait...", { autoClose: 8000 });
  }
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.logoContainer}>
          <img src={RsLogo} alt="Reachy Sports" className={classes.logo} />
        </div>
        <Typography className={classes.info}>NB: THIS DOMAIN IS ONLY FOR REACHY SPORTS ADMIN </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleAuthorize}>
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
