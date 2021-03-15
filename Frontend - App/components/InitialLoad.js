import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from '../navigation/DrawerNavigator';
import AppIntro from '../components/AppIntro';

const InitialLoad = () => {
  const [intro, setIntro] = useState(null);

  useEffect(() => {
    Intro();
  }, []);

  const Intro = async () => {
    try {
      const intro = await AsyncStorage.getItem('intro');
      setIntro(intro);
    } catch (error) {
      console.log(error.message);
    }
  }  

  if (intro === null) return <AppIntro />
  if (intro === 'shown') return <DrawerNavigator />
} 

export default InitialLoad;
