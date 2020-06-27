import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Loader from './Loader';

const NEW_MESSAGE = gql`
  subscription NEW_MESSAGE($groupId: ID!) {
    newMessage(groupId: $groupId) {
      _id
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SEND_MESSAGE($text: String!, $groupId: ID!) {
    sendMessage(text: $text, groupId: $groupId)
  }
`;

const GET_MESSAGES = gql`
  query GET_MESSAGES($groupId: ID!) {
    getMessages(groupId: $groupId) {
      _id
      text 
      createdAt
      sent
      user {
        _id
        name
        avatar
      }
    }
  }
`;

const GroupChat = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const { data, loading, refetch } = useQuery(GET_MESSAGES, { variables: { groupId }, fetchPolicy: "network-only" });
  const { data: newMsg } = useSubscription(NEW_MESSAGE, { variables: { groupId }});
  const [sendMessage] = useMutation(SEND_MESSAGE);  

  useEffect(() => {
    refetch();
    setMessages(() => {
      const msgs = !!data ? [...data.getMessages] : [];
      return GiftedChat.append([], msgs.reverse()); 
    });
  }, [data, newMsg]); 

  if (loading) return <Loader />;

  const onSend = async (message) => {
    setMessages((prevMsgs) => {
      return GiftedChat.append(prevMsgs, message); 
    });
    try {
      await sendMessage({ variables: {
        text: message[0].text, 
        groupId
      }});
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <GiftedChat
      messages={messages}
      renderUsernameOnMessage={true}
      onSend={message => onSend(message)}
      user={{
        _id: 1
      }}
    />
  )
} 

export default withNavigation(GroupChat);
