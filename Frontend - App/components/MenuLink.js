import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import styles from '../styles';

const MenuLink = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={navigation.openDrawer}>
      <MaterialIcons 
        name="menu" 
        size={30} 
        style={{ marginHorizontal: 15 }} 
        color={styles.white}
      />
    </TouchableOpacity>
  )
}

export default withNavigation(MenuLink);
