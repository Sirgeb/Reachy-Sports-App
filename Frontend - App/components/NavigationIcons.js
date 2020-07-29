import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { withNavigation } from "react-navigation";
import { AntDesign, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const NavigationIcons = ({ navigation, route }) => {

  return (
    <View style={styles.container}>
      {
        route === "SportsUpdate" ? null : 
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("SportsUpdate")}>
          <FontAwesome 
            name="newspaper-o" 
            size={24} 
            color="white"
          />
        </TouchableOpacity>
      }
      {
        route === "Competitions" ? null : 
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("Competitions")}>
          <FontAwesome 
            name="trophy" 
            size={23} 
            color="white"
          />
        </TouchableOpacity>
      }
      {
        route === "HallOfFame" ? null : 
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("HallOfFame")}>
          <MaterialIcons
            name="stars" 
            size={25} 
            color="white"
          />
        </TouchableOpacity>
      }
      {
        route === "SportsChat" ? null : 
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("SportsChat")}>
          <AntDesign 
            name="message1" 
            size={22} 
            color="white"
          />
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }, 
  icon: {
    marginRight: 22
  }
});

export default withNavigation(NavigationIcons);
