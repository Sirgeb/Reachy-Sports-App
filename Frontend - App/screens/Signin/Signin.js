import React from 'react';
import styled from 'styled-components/native';
import AuthButton from '../../components/AuthButton';
import styles from '../../styles';
import constants from '../../constants';
import { Image, Text} from 'react-native';

const Signin = () => {

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
                onPress={() => null} 
                text="Sign in with Facebook"
                bgColor={styles.facebook} 
              />
              <AuthButton 
                onPress={() => null} 
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
