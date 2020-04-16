import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import { FontAwesome5, AntDesign, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles';

const CustomDrawerContent = props => (
  <ScrollView>
    <SafeAreaView
      style={style.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View 
        style={{ 
          height: 150, 
          backgroundColor: styles.orange, 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingTop: Platform.OS == 'android' ? 20 : 0 }}>
        <Image source={require('../assets/rsl.png')} style={{ height: 150, width: 150 }} resizeMode="contain" />
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomDrawerContent;
