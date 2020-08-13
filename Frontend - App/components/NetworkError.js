import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles';

const NetworkError = ({ refresh }) => {
  return (
    <View style={layout.container}>
      <AntDesign name="warning" size={50} style={layout.info} />
      <Text style={layout.info}>No Internet Connection</Text>
      <TouchableOpacity onPress={refresh} style={layout.btn}>
        <Text style={layout.btnText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  )
}

const layout = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems:"center"
  },
  btn: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 3, 
    borderColor: styles.darkGrey,
    marginTop: 15
  },
  btnText: {
    color: styles.darkGrey,
    textAlign: "center"
  }, 
  info: {
    color: styles.darkGrey
  }
});

export default NetworkError;
