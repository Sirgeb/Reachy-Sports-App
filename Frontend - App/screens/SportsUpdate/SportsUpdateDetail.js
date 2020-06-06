import React, { useRef, useEffect, useState } from 'react';
import { TextInput, FlatList, TouchableOpacity, Text, View, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useQuery, useSubscription, useMutation } from "react-apollo-hooks";
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import withSuspense from '../../components/withSuspense';
import moment from 'moment';
import gql from 'graphql-tag';
import SportsUpdateHeader from '../../components/SportsUpdateHeader';
import { useIsLoggedIn } from '../../AuthContext';

import constants from '../../constants';
import styles from '../../styles';

const NEW_COMMENT = gql`
  subscription newComment($postId: ID!){
    newComment(postId: $postId) {
      id
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($text: String!, $postId: ID!) {
    createComment(text: $text, postId: $postId) {
      id
    }
  }
`;

const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id 
      caption 
      category
      description 
      image
      commentsCount
      createdAt
      comments {
        id
        text 
        createdAt
        user {
          picture
          fullname
        }
      }
    }
  }
`;
 
const SportsUpdateDetail = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { data: newComment } = useSubscription(NEW_COMMENT, { variables: { postId: id } });
  const { data, refetch } = useQuery(GET_POST, { variables: { postId: id }, suspend: true });
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);
  const [text, setText] = useState("");

  const isLoggedIn = useIsLoggedIn();
  const flatListRef = useRef();

  useEffect(() => {
    if (newComment !== undefined) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
    refetch();
  }, [newComment])

  const sendComment = async () => {
    Keyboard.dismiss();
    try {
      await createComment({ variables: {
        text,
        postId: id
      }});
    } catch (e) {
      console.log(e.message);
    } finally {
      setText("");
    }
  }

  const _renderItem = ({ item: comment }) => {
    return (
      <MessageContainer>
        <Image 
          style={{ backgroundColor: styles.lightGrey }} 
          source={{ uri: comment.user.picture }} 
        />
        <MessageDetail>
          <Name>{`${comment.user.fullname}`}</Name>
          <Message>{comment.text}</Message>
          <Time>{moment(comment.createdAt).fromNow()}</Time>
        </MessageDetail>
      </MessageContainer>
    )
  }

  const post = data.getPost;
  const comments = data.getPost.comments;

  return (
    post && (
    <KeyboardAvoidingView>
      <FlatList
        ListHeaderComponent={() => <SportsUpdateHeader {...post} />}
        keyExtractor={item => item.id}
        data={comments && comments}
        ref={flatListRef}
        contentContainerStyle={{ width: constants.width }}
        renderItem={ _renderItem }
      />
      <> 
        {
          isLoggedIn ? (
                <Wrapper>
                  <TextInput
                    multiline
                    onChangeText={(text) => setText(text)}
                    returnKeyType='send'
                    value={text}
                    placeholder='Have something to say? write here...'
                    style={style.input}
                  />
                  {!!text.trim() && <SendMessageIcon onPress={sendComment}>
                  {
                    loading ? (
                    <ActivityIndicator size={25} color={styles.white}/>
                      ) : (
                    <MaterialIcons name="send" size={25} color={styles.white} />
                    )
                  }
                  </SendMessageIcon>}
              </Wrapper>
          ) : (
            <View>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Signin')} 
                style={{ backgroundColor: styles.orange, padding: 8 }}>
                  <Text style={{ color:styles.white }}>Sign in to write comment!</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </>
    </KeyboardAvoidingView>
    )
  )
}

const style = StyleSheet.create({
  input: {
    alignSelf: "center",
    width: constants.width - 70,
    marginVertical: 10,
    marginHorizontal: 4,
    padding: 8,
    maxHeight: 70,
    borderColor: styles.orange,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14
  }
})
 
const Wrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Name = styled.Text` 
  margin: 0px 10px;
  font-size: 10px;
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

const MessageContainer = styled.View`
  width: ${`${constants.width}px`};
  padding: 10px;
  align-items: flex-end;
  height: auto;
  flex-direction: ${props => !!props.mine ? "row-reverse" : "row" };
`;

const MessageDetail = styled.View`
  width: ${`${constants.width - 70}px`};
  background-color: ${styles.lightGrey};
  border-radius: 5px;
  padding: 10px;
`;

const SendMessageIcon = styled.TouchableOpacity`
  background-color: ${styles.orange};
  border-radius: 20px;
  padding: 5px;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
`;

export default withSuspense(withNavigation(SportsUpdateDetail));
