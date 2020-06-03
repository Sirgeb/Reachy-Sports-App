import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles';

export default () => {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: styles.white
    }}
    >
      <Image 
        source={require('../assets/loading.gif')} 
        resizeMode="contain"
        style={{
          height: 150,
          width: 150
        }}
      />
    </View>
  )
}
