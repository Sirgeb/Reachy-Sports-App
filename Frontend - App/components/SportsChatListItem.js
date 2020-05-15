import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native';
import styles from '../styles';
import { withNavigation } from "react-navigation";

const SportsChatListItem = ({ navigation, title, source, route }) => {
  return (
    <GroupChatContainer>
      <Image 
        source={source}
        style={{ height: 70, width: 70}}
      />
      <View> 
        <Title>{title}</Title>
      </View>
      <Join onPress={() => navigation.navigate(route)}>
        <Text>Join Chat</Text>
      </Join>
    </GroupChatContainer>
  )
}

const Text = styled.Text`
  color: ${styles.white};
`;

const GroupChatContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  padding: 10px;
  margin-bottom: 1.5px;
  width: 95%;
  height: 100px;
  border-bottom-width: 1px;
  border-left-width: 5px;
  border-bottom-color: ${styles.lightGrey};
  border-left-color: ${styles.orange};
  border-style: solid;
`;

const Title = styled.Text`
  align-self: center;
  color: ${styles.orange};
`;

const Join = styled.TouchableOpacity`
  background-color: ${styles.orange};
  padding: 10px;
`;

export default withNavigation(SportsChatListItem);
