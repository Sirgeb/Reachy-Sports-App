import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import styles from '../styles';

const ProfileLink = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("AuthNavigation")}>
      <FontAwesome5 
        name="user-circle" 
        size={28} 
        color={styles.white}
        style={{ marginHorizontal: 30 }}
      />
    </TouchableOpacity>
  )
}

export default withNavigation(ProfileLink);
