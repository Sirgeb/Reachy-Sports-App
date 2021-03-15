import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import Slide from './Slide';
import styles from '../styles';

const FeaturedPosts = ({ data }) => {

    return (
      <SliderContainer>
        <Swiper controlsEnabled={false} loop timeout={3}>
          {data.map(post => (
            <Slide 
              key={post.id}
              postId={post.id}
              caption={post.caption}
              overview={!!post.overview ? post.overview : ""}
              postImage={post.image}
            />
          ))}
        </Swiper>
      </SliderContainer>
    )
  }

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 3}px;
  margin-bottom: 7px;
  background-color: ${styles.lightGrey};
`;

export default FeaturedPosts;
