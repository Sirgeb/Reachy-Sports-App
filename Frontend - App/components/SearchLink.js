import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles';

const SearchLink = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
      <MaterialCommunityIcons 
        name="account-search-outline" 
        size={28} 
        style={{ marginHorizontal: 27, color: styles.white }}
      />
    </TouchableOpacity>
  )
}

export default withNavigation(SearchLink);
