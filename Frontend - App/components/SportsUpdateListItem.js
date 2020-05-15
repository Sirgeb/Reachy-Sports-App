import React from 'react'
import styled from 'styled-components/native';
import styles from '../styles';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { EvilIcons } from '@expo/vector-icons';

const SportsUpdateListItem = ({ navigation, title, createdAt, postComments }) => {

  return (
    <PostContainer onPress={() => navigation.navigate('SportsUpdateDetail')}>
      <Image 
          source={{ uri: "https://soccernet.ng/wp-content/uploads/2019/07/ekong.jpg"}}
      />
      <Wrapper>
        <PostTitle>{title}</PostTitle>
        <View style={{ flexDirection: "row"}}>
          <Category>Football</Category> 
          <Time> | Posted: {createdAt}</Time>
        </View>
      </Wrapper>
      <Comment> 
        <CommentCount>{postComments}</CommentCount>
        <EvilIcons size={26} name="comment" style={{ color: styles.white }}/>
      </Comment>
    </PostContainer>
  )
}

const Wrapper = styled.View`
  justify-content: space-between;
  padding: 10px;
  flex: 1;
`;

const PostContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fafafa;
  margin-bottom: 1.5px;
  padding: 10px;
  height: 100px;
  border-bottom-width: 1px;
  border-left-width: 5px;
  border-bottom-color: ${styles.lightGrey};
  border-left-color: ${styles.orange};
  border-style: solid;
`;

const Image = styled.Image`
  height: 80px; 
  width: 80px;
`;

const PostTitle = styled.Text`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Time = styled.Text`
  color: ${styles.dark};
  font-size: 12px;
`;

const CommentCount = styled.Text``;

const Category = styled.Text`
  color: ${styles.orange};
  width: auto;
  text-align: center;
  font-size: 12px;
`;

const Comment = styled.View`
  justify-content: space-around;
  align-items: center;
  background-color: ${styles.orange};
  width: 50px;
`;

export default withNavigation(SportsUpdateListItem);
