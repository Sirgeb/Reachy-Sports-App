import React, { useContext, useState, useEffect, useRef } from 'react'; 
import { View, Image, Text, StyleSheet, Alert,TouchableOpacity, SafeAreaView } from 'react-native';
import * as Facebook from 'expo-facebook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import { AntDesign } from '@expo/vector-icons';
import { useQuery } from 'react-apollo-hooks';
import * as Google from 'expo-google-app-auth';
import withSuspense from '../components/withSuspense';
import { AuthContext } from '../AuthContext';
import Loader from '../components/Loader';
import AuthButton from '../components/AuthButton';
import { googleClientID } from '../config';
import styles from '../styles';
import constants from '../constants';

const GET_AUTHENTICATED_USER = gql`
  query GET_AUTHENTICATED_USER {
    getAuthenticatedUser {
      name 
      avatar 
      groupParticipant {
        groupName
      }
    }
  }
`;

const Account = ({ navigation }) => {
  const { logUserOut, unsetAccessToken } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const { data, refetch } = useQuery(GET_AUTHENTICATED_USER, { suspend: true });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const refresh = async () => {
      await refetch();
    }
    refresh();
    return () => {
      mounted.current = false;
    } 
  }, []);

  const handleSignOut = () => {
    Alert.alert("Do you really want to logout?", "", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            if (mounted.current === true) setProcessing(true)
              const accessToken = await AsyncStorage.getItem("accessToken");
              await Google.logOutAsync({     
                androidClientId: googleClientID,
                accessToken
              });
              // await Facebook.logOutAsync();
              await unsetAccessToken();
              await logUserOut();
              if (mounted.current === true) setProcessing(false);
          } catch(e) {
            console.log(e.message);
          } 
        }
      }, 
      {
        text: "No", 
        onPress: null
      }
    ]);
  }

  return (
    <SafeAreaView style={layout.container}>
      <TouchableOpacity style={layout.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
      <View style={layout.userInfo}>
        <Image style={layout.profileImage}
          source={{ uri: data.getAuthenticatedUser.avatar }}
        />
        <Text style={layout.name}>Hi, {data.getAuthenticatedUser.name}</Text>
        <Text style={layout.info}>We are glad to have you on Reachy Sports</Text>
      </View>
      <View style={layout.groupsSection}>
      <Image 
        style={layout.gifImage} 
        source={require('../assets/celebrate.gif')}
      />
       {
         data.getAuthenticatedUser.groupParticipant[0] !== undefined ? (
            <View>
              <Text style={layout.rowHeader}>You are a participant in these groups:</Text>
              <Text style={layout.rowInfo}>
                {
                  data.getAuthenticatedUser.groupParticipant.map(group => {
                    return (
                      "| " + group.groupName + " |"
                    )
                  })
                }
              </Text>
            </View>
         ) : ( 
            <View>
              <Text style={layout.rowHeader}>You are not a participant in our groups yet!</Text>
              <Text style={layout.rowInfo}>Try and join any of our group chat</Text>
            </View>
         )
       }
      </View>
      <View style={layout.authButtonContainer}>
        {
          processing ? <Loader /> : (
            <AuthButton 
              bgColor={styles.orange}
              onPress={handleSignOut}
            >
              <View>
                <Text style={layout.authBtnText}>Sign Out</Text>
              </View>
            </AuthButton>
          )
        }
      </View>
    </SafeAreaView>
  )
}

const layout = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styles.white,
    borderRightWidth: 10, 
    borderLeftWidth: 10, 
    borderColor: styles.orange,
    borderStyle: "solid"
  },
  backButton: {
    position: "absolute", 
    top: 40, 
    left: 20
  },
  userInfo: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  profileImage: {
    backgroundColor: styles.lightGrey,
    height: constants.height / 4.5,
    width: constants.height / 4.5,
    marginBottom: 10,
    borderRadius: 75
  }, 
  name: {
    fontSize: 14, 
    textAlign: "center"
  },
  info: {
    fontSize: 12, 
    textAlign: "center"
  },
  groupsSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  gifImage: {
    height: constants.height / 4.5,
    width: constants.height / 4.5
  },
  rowHeader: {
    marginBottom: 5, 
    fontSize: 14,  
    textAlign: "center"
  },
  rowInfo: {
    fontSize: 12, 
    textAlign: "center"
  },
  authButtonContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center"
  },
  authBtnText: {
    color: styles.white, 
    alignSelf: 'center'
  }
});

export { GET_AUTHENTICATED_USER };
export default withSuspense(withNavigation(Account)); 
