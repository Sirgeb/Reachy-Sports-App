import React, { useState, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { AppLoading } from 'expo';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, FontAwesome5, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import clientConfig from './apollo';
import DrawerNavigation from "./navigation/DrawerNavigation";
import assets from './assets';

const App = () => { 
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

  const preLoad = async () => {
    // await AsyncStorage.clear();
    try {
      // Preload Fonts
      await Font.loadAsync({
        ...Ionicons.font,
        ...EvilIcons.font,
        ...MaterialIcons.font,
        ...AntDesign.font,
        ...FontAwesome.font,
        ...FontAwesome5.font,
        ...MaterialCommunityIcons.font
      });

      // Preload Assets
      await Asset.loadAsync([
        ...assets
      ]);

      // Preload Cache
      const cache = new InMemoryCache();

      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      // initialize client with cache
      const client = clientConfig(cache);

      setLoaded(true);
      setClient(client);

    } catch(e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ?  (
    <ApolloProvider client={client}>
      <DrawerNavigation />
    </ApolloProvider>
  ) : (
    <AppLoading />
  )
}

export default App;
