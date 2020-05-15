import React, { useRef } from 'react';
import { TextInput, FlatList, TouchableOpacity, Text, View, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import SportsUpdateHeader from '../../components/SportsUpdateHeader';

import constants from '../../constants';
import styles from '../../styles';

const user = true;
 
const SportsUpdateDetail = ({ navigation }) => {
  const flatListRef = useRef();

    return (
      <KeyboardAvoidingView>
       <FlatList
          ListHeaderComponent={() => <SportsUpdateHeader />}
          keyExtractor={item => item.id}
          data={List}
          ref={flatListRef}
          contentContainerStyle={{ width: constants.width }}
          renderItem={({item}) => (
            <MessageContainer>
              <Image source={require('../../assets/unknown-profile.png')} />
              <MessageDetail mine={item.mine}>
                <Name>{item.name}</Name>
                <Message>{item.message}</Message>
                <Time>{item.time}</Time>
              </MessageDetail>
            </MessageContainer>
          )}
        />
        <>
          {
            user ? (
                  <Wrapper>
                    <TextInput
                      multiline
                      onChangeText={(comment) => null}
                      returnKeyType='send'
                      placeholder='Write your comment here...'
                      onFocus={() => flatListRef.current.scrollToEnd()}
                      onSubmitEditing={() => null} 
                      style={{ 
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
                      }}
                    />
                  {/* {
                    <ActivityIndicator size={25} color={styles.orange}/>
                  } */}
                   <SendMessageIcon onPress={() => {
                      Keyboard.dismiss()
                      flatListRef.current.scrollToEnd()
                      }}>
                    <MaterialIcons name="send" size={25} color={styles.white} />
                   </SendMessageIcon>
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
}

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

const List = [{
  id: "erreer",
  name: "Gabriel Aniora",
  message: "Welcome to Reachy Sports",
  time: "2 hours ago",
},
{
  id: "ggghjj", 
  name: "Chinedu Okorie",
  message: "A pleasure to be here they allowed him that is too hard to be seen",
  time: "1 hour ago",
}, {
  id: "kdslfklksdkl",
  name: "Joy Igbokwe",
  message: "it is true that he was impeached but they allowed him that is too hard to be seen now I tell you brother",
  time: "2 seconds ago",
},
{
  id: "ggghkghgkhjj", 
  name: "Chinedu Okorie",
  message: "A pleasure to be here they allowed him that is too hard to be seen",
  time: "1 hour ago",
}, {
  id: "kdslfklkhjhjhjsdkl",
  name: "Joy Igbokwe",
  message: "it is true that he was impeached but they allowed him that is too hard to be seen now I tell you brother",
  time: "2 seconds ago",
}];


export default withNavigation(SportsUpdateDetail);
