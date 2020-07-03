import React from "react";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
import { withNavigation } from 'react-navigation';
import { trimText } from '../utils';
import styles from '../styles';

const Slide = ({ postId, caption, overview, postImage, navigation }) => {

  return (
    <Container>
      <BackgroundImage source={{ uri: postImage }} />
      <Content>
        <PortraitImage source={{ uri: postImage }} />
        <Data>
          <Text style={style.caption}>{trimText(caption, 40)}</Text>
          <Text style={[style.caption, style.overview]}>{trimText(overview, 80)}</Text>
          <Button onPress={() => navigation.navigate("SportsUpdateDetail", { id: postId })}>
            <ButtonText>Read On...</ButtonText>
          </Button>
        </Data>
      </Content>
    </Container>
  );
};

const style = StyleSheet.create({
  caption: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: styles.white,
    fontWeight: 'bold',
    fontSize: 19
  },
  overview: {
    fontSize: 14,
    fontWeight: '500'
  }
});

const Container = styled.View`
  height: 100%;
  width: 100%;
`;

const BackgroundImage = styled.Image`
  height: 100%;
  width: 100%;
  opacity: 0.8;
  position: absolute;
`;

const Content = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Data = styled.View`
  width: 50%;
  align-items: flex-start;
`;

const Button = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: ${styles.orange};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  padding: 7px 10px;
  border-radius: 3px;
`;

const ButtonText = styled.Text`
  color: white;
`;

const PortraitImage = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 4px;
`;

export default withNavigation(Slide);
