import React from 'react';
import styled from 'styled-components/native';
import constants from "../constants";
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

const AuthButton = ({ onPress, loading=false, bgColor=null, children }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {
        loading ? <ActivityIndicator color="white"/> : <>{children}</>
      }
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AuthButton;

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${props => props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px; 
  width: ${`${constants.width / 2}px`};
  margin-bottom: 25px;
`;
