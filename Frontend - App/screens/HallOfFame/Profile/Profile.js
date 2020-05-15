import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import styles from '../../../styles';
import constants from '../../../constants';
import HTMLView from 'react-native-htmlview';

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: styles.orange, width: constants.width }} />
      <View style={{ 
          position: 'absolute',
          top: 80,
          left: 30,
          backgroundColor: styles.white, 
          width: constants.width - 60, 
          borderRadius: 16,
          height: 120,
          padding: 10,
          zIndex: 5,
          justifyContent: 'flex-end',
          alignItems: "center"
        }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: 200 }}>
            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('../../../assets/unknown-profile.png')} />
          </View>
          <Text>Gabriel Aniora </Text>
          <Text>Date Of Birth: 19/10/2008</Text>
          <Text>Programmer</Text>
        </View>

      <View style={{ flex: 3, backgroundColor: styles.white, alignItems: 'center' }}>
        <ScrollView style={{ 
          backgroundColor: styles.white, 
          width: constants.width,
          borderRadius: 10,
          marginTop: 80,
          marginBottom: 10,
          flex: 1
        }}>
          <HTMLView
            value={htmlContent}
            stylesheet={webViewStyles}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const htmlContent = `<div><h2>Biography </h2><b>I have been looking for an opportunity like this</b><br /><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p> as opposed to using 'Content here, content here', making it look like readable English.<p> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,</p> and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)</p></div>`;
 
const webViewStyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366',
  },
  h2: {
    fontSize: 14,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  div: {
    margin: 10,
    textAlign: "justify",
    lineHeight: 20
  }
});

export default Profile
