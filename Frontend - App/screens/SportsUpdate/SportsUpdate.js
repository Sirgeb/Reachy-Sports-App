import React from 'react'
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import SportsUpdateListItem from '../../components/SportsUpdateListItem';
import styles from '../../styles';
import constants from '../../constants';

const Container = styled.View` 
  margin: 10px;
  background-color: ${styles.white};
`;

const List = [{
  id: '2kjl2jkj2ljlk2l',
  title: "Super Eagles of Nigeria Ready",
  createdAt: "4 hours ago",
  postComments: "0"
}, {
  id: 'kljl32k24l2k3j4l3',
  title: 'Italy the resume sports activities',
  createdAt: '5 hours ago',
  postComments: '0'
}, {
  id: 'kljl32k24kjkkl2k3j4l3',
  title: 'Italy the resume sports activities',
  createdAt: '5 hours ago',
  postComments: '2'
}, {
  id: 'kljl32k24l2jkkk3j4l3',
  title: 'Italy the resume sports activities',
  createdAt: '5 hours ago',
  postComments: '5'
},
{
  id: 'kljl32k24l2kii3j4l3',
  title: 'Italy the resume',
  createdAt: '5 hours ago',
  postComments: '3'
}, {
  id: 'kljk24l2k3j4l3',
  title: 'Italy the resume sports activities',
  createdAt: '5 hours ago',
  postComments: '7'
}, {
  id: 'kljl32k24l2hjgjghk3j4l3',
  title: 'Italy the resume sports activities',
  createdAt: '5 hours ago',
  postComments: '5'
}];

const SportsUpdate = () => {

  return (
    <Container>
      <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={List}
          contentContainerStyle={{ width: constants.width }}
          renderItem={({item}) => (
            <SportsUpdateListItem { ...item }/>
          )}
        />
    </Container>
  )
}

export default SportsUpdate;
