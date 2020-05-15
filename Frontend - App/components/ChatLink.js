import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withNavigation } from "react-navigation";

const ProfileLink = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SportsChat")}>
      <Image 
        source={require('../assets/sports-chat/person.gif')} 
        resizeMode="contain" 
        style={{ height: 30, width: 45, marginHorizontal: 8 }}
      />
    </TouchableOpacity>
  )
}

export default withNavigation(ProfileLink);
