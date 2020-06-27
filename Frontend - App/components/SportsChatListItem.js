import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { withNavigation } from "react-navigation";
import gql from 'graphql-tag';
import { useIsLoggedIn } from '../AuthContext';
import { Feather } from '@expo/vector-icons';
import styles from '../styles';

const ADD_PARTICIPANT = gql`
  mutation ADD_PARTICIPANT($groupId: ID!) {
    addParticipant(groupId: $groupId)
  }
`;

const SportsChatListItem = ({ id, navigation, title, icon, route, isParticipant, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [addParticipant] = useMutation(ADD_PARTICIPANT, { variables: { groupId: id }});
  const isLoggedIn = useIsLoggedIn();

  const handleJoinChat = async (groupId, route, refetch) => {
    if (!isLoggedIn) navigation.navigate("Signin", { groupId, nextRoute: route });
    try {
      setLoading(true);
      await addParticipant({
        variables: { 
          groupId
        }
      });
      await refetch();
      navigation.navigate(route, { groupId });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (isParticipant) {
    return (
       <TouchableOpacity 
        style={style.container} 
        onPress={() => navigation.navigate(route, { groupId: id })}
      >
        <Image 
          source={{uri: icon}}
          style={style.image}
        />
        <View> 
          <Text style={style.title}>{title}</Text>
        </View>
        <Feather name="users" size={25} style={{ color: styles.orange, marginHorizontal: 22 }} />
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={style.container}>
        <Image 
          source={{uri: icon}}
          style={style.image}
        />
        <View> 
          <Text style={style.title}>{title}</Text>
        </View>
        <TouchableOpacity style={style.joinButton} onPress={() => handleJoinChat(id, route, refetch)}>
          {
            loading ? (
            <ActivityIndicator color={styles.white} size={22} /> 
            ) : (
            <Text style={style.joinBtnText}>Join Chat</Text>
            )
          }
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 10,
    marginBottom: 1,
    width: "95%",
    height: 95,
    borderBottomWidth: 1,
    borderLeftWidth: 5,
    borderBottomColor: styles.lightGrey,
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
    fontSize: 15
  },
  joinBtnText: {
    color: styles.white
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
