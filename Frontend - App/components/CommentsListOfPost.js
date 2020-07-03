import React from 'react';
import moment from 'moment';
import styled from 'styled-components/native';

import constants from '../constants';
import styles from '../styles';

class CommentsListOfPost extends React.PureComponent {
  render() {
    const { comment } = this.props;
    return (
      <MessageContainer>
        <Image 
          style={{ backgroundColor: styles.lightGrey }} 
          source={{ uri: comment.user.avatar }} 
        />
        <MessageDetail>
          <Name>{`${comment.user.name}`}</Name>
          <Message>{comment.text}</Message>
          <Time>{moment(comment.createdAt).fromNow()}</Time>
        </MessageDetail>
      </MessageContainer>
    )
  }
}

const MessageContainer = styled.View`
  width: ${`${constants.width}px`};
  padding: 10px;
  align-items: flex-end;
  height: auto;
  flex-direction: ${props => !!props.mine ? "row-reverse" : "row" };
`;

const Message = styled.Text` 
  margin: 10px;
`;

const Image = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px;
  background-color: #adadad;
`;

const Time = styled.Text` 
  margin: 0px 10px;
  font-size: 10px;
`;

const Name = styled.Text` 
  margin: 0px 10px;
  font-size: 10px;
`;

const MessageDetail = styled.View`
  width: ${`${constants.width - 70}px`};
  background-color: ${styles.lightGrey};
  border-radius: 5px;
  padding: 10px;
`;

export default CommentsListOfPost;
