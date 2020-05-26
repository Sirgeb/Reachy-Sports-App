import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components/native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { Image, Text } from 'react-native';
import gql from 'graphql-tag';
import { facebookAppID, googleClientID } from '../../config';
import AuthButton from '../../components/AuthButton';
import styles from '../../styles';
import constants from '../../constants';
import { useLogIn } from '../../AuthContext';

const CREATE_ACCOUNT = gql`  
  mutation createAccount(
    $firstname: String!
    $lastname: String! 
    $email: String 
    $picture: String
    $facebookID: String 
    $googleID: String
  ) {
    createAccount(
      firstname: $firstname  
      lastname: $lastname 
      email: $email 
      picture: $picture  
      facebookID: $facebookID  
      googleID: $googleID
    )
  }
`;

const Signin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const logIn = useLogIn();

  const facebookLogin = async () => {
    try {
      setLoading(true);
      await Facebook.initializeAsync(facebookAppID);
      
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,picture`
        );

        const { 
          id, email, first_name, last_name, picture: { data : { url: profile_picture } } 
        } = await response.json();

        const { data: { createAccount: jwtToken } } = await createAccount({
          variables: {
            firstname: first_name,
            lastname: last_name,
            email,
            picture: profile_picture,
            facebookID: id
          }
        });

        await logIn(jwtToken);

        navigation.navigate('SportsUpdate');

      } else { 
        return
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  const googleLogin = async () => {
    try {
      setLoading(true)

      const result = await Google.logInAsync({
        androidClientId: googleClientID,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });

        const { id, email, family_name, given_name, picture } = await user.json();

        const { data: { createAccount: jwtToken } } = await createAccount({
          variables: {
            firstname: given_name,
            lastname: family_name,
            email,
            picture,
            googleID: id
          }
        });

        await logIn(jwtToken);

        navigation.navigate('SportsUpdate');

      } else {
        return { cancelled: true };
      }
    } catch (error) {
      return { error: error.message };
    } finally {
      setLoading(false)
    }
  }

  return (
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
      <Text style={{ padding: 10, color: styles.orange}}>To Join Conversation</Text>
      <Wrapper>
        <AuthButton
          onPress={facebookLogin}
          text="Sign in with Facebook"
          bgColor={styles.facebook}
        />
        <AuthButton
          onPress={googleLogin}
          text="Sign in with Google"
          bgColor={styles.google}
        />
      </Wrapper>
    </Container>
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

export default Signin
