import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { withNavigation } from "react-navigation";
import gql from 'graphql-tag';
import { useIsLoggedIn } from '../AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GET_AUTHENTICATED_USER } from './MyAccount';
import styles from '../styles';

const ADD_PARTICIPANT = gql`
  mutation ADD_PARTICIPANT($groupId: ID!, $groupName: String!) {
    addParticipant(groupId: $groupId, groupName: $groupName)
  }
`;

const SportsChatListItem = ({ id, navigation, title, name, route, isParticipant, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [addParticipant] = useMutation(ADD_PARTICIPANT, { variables: { groupId: id, groupName: title }});
  const isLoggedIn = useIsLoggedIn();

  const handleJoinChat = async (groupId, route) => {
    if (!isLoggedIn) navigation.navigate("Signin", { groupId, nextRoute: route });
    try {
      setLoading(true);
      await addParticipant({
        variables: { 
          groupId
        },
        refetchQueries: () => [{ query: GET_AUTHENTICATED_USER }]
      });
      navigation.navigate(route, { groupId });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const FOOTBALL = require("../assets/football-player.jpg");
  const BASKETBALL = require("../assets/basketball-player.jpg");
  const TENNIS = require("../assets/racket.jpg");
  const GOLF = require("../assets/golf.jpg");
  const ATHLETICS = require("../assets/exercise.jpg"); 
  const BOXING = require("../assets/gloves.jpg");

  const Icons = {
    FOOTBALL,
    BASKETBALL,
    TENNIS,
    GOLF,
    BOXING,
    ATHLETICS
  }

  return (
    <View style={style.container}>
      <Image 
        source={Icons[name]}
        style={style.image}
      />
      <View> 
        <Text style={style.title}>{title}</Text>
      </View>
      {
        isParticipant ? (
          <TouchableOpacity style={style.joinButton} onPress={() => navigation.navigate(route, { groupId: id })}>
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={20} 
              style={{ color: styles.white, paddingHorizontal: 12 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={style.joinButton} onPress={() => handleJoinChat(id, route, refetch)}>
            {
              loading ? (
                <ActivityIndicator color={styles.white} size={22} /> 
              ) : (
                <Text style={style.joinBtnText}>Join Chat</Text>
              )
            }
          </TouchableOpacity>
        )
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 1,
    width: "95%",
    height: 95,
    borderLeftWidth: 5,
    borderLeftColor: styles.orange,
    borderStyle: "solid"
  },
  image: {
    height: 70, 
    width: 70,
    backgroundColor: styles.lightGrey
  },
  title: {
    alignSelf: "center",
    color: styles.orange,
    fontSize: 14
  },
  joinBtnText: {
    color: styles.white,
    fontSize: 12
  }, 
  joinButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styles.orange,
    padding: 10,
    width: 80
  }
});

export default withNavigation(SportsChatListItem);
