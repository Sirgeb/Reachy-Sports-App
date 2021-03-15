import React, { useState, useContext, useRef, useEffect } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { Image, Text } from 'react-native';
import gql from 'graphql-tag';
import { AuthContext, useIsLoggedIn } from '../../AuthContext';
import { facebookAppID, googleClientID } from '../../config';
import MyAccount from '../../components/MyAccount';
import AuthButton from '../../components/AuthButton';
import styles from '../../styles';
import constants from '../../constants';

const CREATE_ACCOUNT = gql`  
  mutation createAccount(
    $firstname: String!
    $lastname: String! 
    $email: String 
    $avatar: String
    $facebookID: String 
    $googleID: String
  ) {
    createAccount(
      firstname: $firstname  
      lastname: $lastname 
      email: $email 
      avatar: $avatar  
      facebookID: $facebookID  
      googleID: $googleID
    ) {
      token
      userId
      groupNames
    }
  }
`;

const Signin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const isLoggedIn = useIsLoggedIn();
  const { logUserIn, setAccessToken } = useContext(AuthContext);
  const mounted = useRef(true);
  let nextRoute = navigation.getParam('nextRoute');
  const groupId = navigation.getParam('groupId');

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    }
  }, [])

  if (!navigation.getParam('nextRoute')) {
    nextRoute = "SportsUpdate"
  }

  const facebookLogin = async () => {
    try {
      if (mounted.current === true) setLoading(true);

      await Facebook.initializeAsync({
        appId: facebookAppID,
      });
      
      const { type, token: userToken } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        const userProfile = await fetch(
          `https://graph.facebook.com/me?access_token=${userToken}&fields=id,email,first_name,last_name`
        );
        const { id, email, first_name, last_name } = await userProfile.json();
        const { data: { createAccount: { token, groupNames } } } = await createAccount({
          variables: {
            firstname: first_name,
            lastname: last_name, 
            email,
            avatar: `http://graph.facebook.com/${id}/picture`,
            facebookID: id
          }
        });

        await logUserIn(token);
        navigation.navigate(nextRoute, { groupId });
        if (mounted.current === true) setLoading(false);
      } else { 
        return
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const googleLogin = async () => {
    try {
      setLoading(true);
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: googleClientID,
        scopes: ['profile', 'email'],
      });
      
      // store access token to be used when signing out
      await setAccessToken(accessToken || "");

      if (type === 'success') {
        const { id, email, familyName, givenName, photoUrl } = user;
        const { data: { createAccount: { token } } } = await createAccount({
          variables: {
            firstname: givenName,
            lastname: familyName,
            email,
            avatar: photoUrl,
            googleID: id
          }
        });

        await logUserIn(token);
        setLoading(false);
        navigation.navigate(nextRoute, { groupId });
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  return (
    isLoggedIn ? (
      <MyAccount navigation={{...navigation}} />
    ) : (
        <Container>
          <Picture>
            <Image
              source={require('../../assets/texting.gif')}
              resizeMode="contain"
              style={{ 
                width: constants.width - 20, 
                height: "100%",
              }}
            />
          </Picture>
          {!loading && <Text style={{ padding: 10, color: styles.orange }}>To Join Conversation</Text>}
          {
            loading ? 
              <Image 
                source={require('../../assets/loading.gif')} 
                resizeMode="contain"
                style={{
                  height: 150,
                  width: 150
                }}
              /> : 
              <Wrapper>
              <AuthButton
                onPress={facebookLogin}
                bgColor={styles.facebook}
              > 
                <Content>
                  <FontAwesome 
                    name="facebook" 
                    size={20} 
                    style={{ marginRight: 5}} 
                    color={styles.white} 
                  />
                  <Text style={{ color: styles.white }}>Login with facebook</Text>
                </Content>
              </AuthButton>

              <AuthButton
                onPress={googleLogin}
                bgColor={styles.google}
              >
                <Content>
                  <AntDesign 
                    name="google" 
                    size={20} 
                    color={styles.white} 
                    style={{ marginRight: 5}} 
                  />
                  <Text style={{ color: styles.white }}>Login with google</Text>
                </Content>
              </AuthButton>
            </Wrapper>
          }
        <GoBack onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} />
        </GoBack>
      </Container>
    )
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${styles.white};
  border-right-width: 10px;
  border-left-width: 10px;
  border-color: ${styles.orange};
  border-style: solid;
`;

const GoBack = styled.TouchableOpacity`
  position: absolute;
  z-index: 500;
  top: 40px; 
  left: 20px;
`;

const Wrapper = styled.View`
  flex: 1;
  border-top-width: 1px;
  border-color: ${styles.lightGrey};
  border-style: solid;
  padding: 20px;
`;

const Picture = styled.View`
  flex: 2;
`
const Content = styled.View`
  flex-direction: row;
  justify-content: center; 
  align-items: center; 
`;

export default Signin;
