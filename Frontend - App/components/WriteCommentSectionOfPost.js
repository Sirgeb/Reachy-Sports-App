import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsLoggedIn } from '../AuthContext';

import styles from '../styles';
import constants from '../constants';

const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT($text: String!, $postId: ID!) {
    createComment(text: $text, postId: $postId) {
      id 
      text
      createdAt
      user {
        avatar
        name
      }
    }
  }
`;

const WriteCommentSectionOfPost = ({ navigation, postId }) => {
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);
  const [text, setText] = useState("");
  const isLoggedIn = useIsLoggedIn();

  const sendComment = async () => {
    Keyboard.dismiss();
    try {
      await createComment({ 
        variables: {
          text,
          postId
        },
      });
    } catch (e) {
      console.log(e.message);
    } finally {
      setText("");
    }
  }

  return (
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
          onPress={() => navigation.navigate('Signin', { nextRoute: "SportsUpdate" })} 
          style={{ backgroundColor: styles.orange, padding: 8 }}>
            <Text style={{ color:styles.white }}>Sign in to write comment!</Text>
        </TouchableOpacity>
      </View>
    )
  )
}

const Wrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SendMessageIcon = styled.TouchableOpacity`
  background-color: ${styles.orange};
  border-radius: 20px;
  padding: 5px;
`;

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
});

export default WriteCommentSectionOfPost;
