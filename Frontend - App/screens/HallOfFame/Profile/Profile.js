import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../styles';
import constants from '../../../constants';
import { formatLetters, getAge } from '../../../utils';

const Profile = ({ navigation }) => {
  const {
    bio,
    dateOfBirth,
    fullname,
    image,
    country,
    updatedAt
  } = navigation.getParam("superStar");

  return (
    <View style={layout.container}>
      <View style={layout.header} />
        <View style={layout.profileCard}>
            <View style={layout.imageContainer}>
              <Image 
                style={layout.profileImage} 
                source={{ uri: image }} 
              />
              <MaterialCommunityIcons 
                name="star-circle" 
                size={30} 
                style={layout.profileImageStar}
              />
            </View>
            <Text>Name: { formatLetters(fullname) }</Text>
            <Text>Date Of Birth: {dateOfBirth} | Age: {getAge(dateOfBirth)}yrs</Text>
            <Text>Country: {country}</Text>
            <Text>Profile Updated On: {moment(updatedAt).format('D/M/YYYY')}</Text>
          </View>

      <View style={layout.scrollViewContainer}>
        <ScrollView style={layout.scrollView}>
          <HTMLView
            value={bio}
            stylesheet={webViewStyles}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const layout = StyleSheet.create({
  container: {
    flex: 1 
  },
  header: {
    flex: 1, 
    backgroundColor: styles.orange, 
    width: constants.width
  },
  profileCard: {
    position: 'absolute',
    top: 80,
    left: 30,
    backgroundColor: styles.white, 
    width: constants.width - 60, 
    borderRadius: 16,
    height: 120,
    zIndex: 5,
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  imageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 200
  },
  profileImageStar: {
    position: "absolute",
    top: 48,
    left: 18,
    color: styles.orange,
    backgroundColor: styles.white,
    borderRadius: 15
  },
  profileImage: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: styles.lightGrey
  },
  scrollView: {
    backgroundColor: styles.white, 
    width: constants.width,
    borderRadius: 10,
    marginTop: 70,
    marginBottom: 10,
    flex: 1
  },
  scrollViewContainer: {
    flex: 3, 
    backgroundColor: styles.white, 
    alignItems: 'center'
  }
});
 
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

export default Profile;
