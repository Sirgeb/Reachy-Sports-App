import React from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from '../styles';
import { EvilIcons, FontAwesome5 } from '@expo/vector-icons';

class SportsUpdateListItem extends React.PureComponent {

  render() {
    const { id, navigation, caption, image, category, createdAt, commentsCount } = this.props;
    return (
      <PostContainer onPress={() => navigation.navigate('SportsUpdateDetail', { id })}>
        <Image 
          style={{ backgroundColor: styles.lightGrey }}
          source={{ uri: image }}
        />
        <Wrapper>
          <PostTitle numberOfLines={2}>{caption}</PostTitle>
          <View style={{ flexDirection: "row" }}>
            <Category>{category}</Category> 
            <Time> | <FontAwesome5 name="clock" size={10} color={styles.ash} /> {moment(createdAt).fromNow()} </Time>
          </View>
        </Wrapper>
        <Comment> 
          <CommentCount>{commentsCount}</CommentCount>
          <EvilIcons size={26} name="comment" style={{ color: styles.white }}/>
        </Comment>
      </PostContainer>
    )
  }
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
  font-size: 11px;
  padding-top: 0.5px;
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
