import React from 'react'
import styled from 'styled-components/native';
import { Image } from 'react-native';
import styles from '../../styles';

const Container = styled.View` 
  margin: 10px;
  background-color: ${styles.grey};
`;

const Text = styled.Text``;
const Wrapper = styled.View`
  padding: 10px;
`;

const PostContainer = styled.View`
  flex-direction: row;
  background-color: #fafafa;
  margin-bottom: 1.5px;
  padding: 10px;
`;
const PostTitle = styled.Text`
  flex-direction: row;
  flex-wrap: wrap;
`;
const Base = styled.View`
  flex: 1;
  justify-content: space-around;
`;
const Time = styled.View``;
const Comment = styled.View``;

class SportsUpdate extends React.Component {

  render() {
    return (
      <Container>
        <PostContainer>
          <Image 
            source={require('../../assets/colors.jpg')}
            style={{ height: 80, width: 80}}
          />
          <Wrapper>
            <PostTitle>Super Eagles of Nigeria Ready</PostTitle>
            <Base>
              <Time>  
                <Text>Posted: 4 hours ago</Text>
              </Time>
              <Comment> 
                <Text>8 comments</Text>
              </Comment>
            </Base>
          </Wrapper>
        </PostContainer>

        <PostContainer>
          <Image 
            source={require('../../assets/colors.jpg')}
            style={{ height: 80, width: 80}}
          />
          <Wrapper>
            <PostTitle>Super Eagles of Nigeria Ready</PostTitle>
            <Base>
              <Time>  
                <Text>Posted: 4 hours ago</Text>
              </Time>
              <Comment> 
                <Text>8 comments</Text>
              </Comment>
            </Base>
          </Wrapper>
        </PostContainer>

        <PostContainer>
          <Image 
            source={require('../../assets/colors.jpg')}
            style={{ height: 80, width: 80}}
          />
          <Wrapper>
            <PostTitle>Super Eagles of Nigeria Ready</PostTitle>
            <Base>
              <Time>  
                <Text>Posted: 4 hours ago</Text>
              </Time>
              <Comment> 
                <Text>8 comments</Text>
              </Comment>
            </Base>
          </Wrapper>
        </PostContainer>
      </Container>
    )
  }
}

export default SportsUpdate
