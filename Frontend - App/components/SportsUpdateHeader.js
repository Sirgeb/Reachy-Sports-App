import React from 'react';
import { StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
import HTMLView from 'react-native-htmlview';
import { EvilIcons } from '@expo/vector-icons';

import constants from '../constants';
import styles from '../styles';

const SportsUpdateHeader = () => {

  return (
    <Container>
      <Image 
        source={{ uri: "https://soccernet.ng/wp-content/uploads/2019/07/ekong.jpg" }}
        style={{ height: constants.height / 3, width: constants.width }}
      />
      <PostTitle>Super Eagles Ready For The Game</PostTitle>
      <HTMLView
        value={htmlContent}
        stylesheet={webViewStyles}
      />
      <CommentSectionHeader>
        <EvilIcons name="comment" size={26} />
        <CommentSectionHeaderText>36 Comments</CommentSectionHeaderText>
      </CommentSectionHeader>
    </Container>
  )
}

const Container = styled.ScrollView`
  background-color: white;
`;

const PostTitle = styled.Text`
  color: ${styles.white};
  padding: 10px;
  font-size: 14px;
  background-color: ${styles.orange};
`;

const CommentSectionHeader = styled.View`
  background-color: ${styles.lightGrey};
  padding: 10px;
  flex-direction: row;
`;

const CommentSectionHeaderText = styled.Text``;

const webViewStyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366',
  },
  h2: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  div: {
    margin: 10,
    textAlign: "justify",
    lineHeight: 20
  }
});

const htmlContent = `<div><b>I have been looking for an opportunity like this</b><br /><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p> as opposed to using 'Content here, content here', making it look like readable English.<p> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,</p> and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)</p></div>`;
 
export default SportsUpdateHeader;
