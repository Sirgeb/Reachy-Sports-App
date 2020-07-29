import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

  const logUserIn = async (token) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const setUserId = async (userId) => {
    try {
      await AsyncStorage.setItem("userId", userId);
    } catch (e) {
      console.log(e.message);
    }
  }

  const setAccessToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
    } catch (e) {
      console.log(e.message);
    }
  }
  
  const unsetAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
    } catch (e) {
      console.log(e.message);
    }
  }

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.removeItem("jwt");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      logUserIn, 
      logUserOut, 
      setUserId, 
      setAccessToken,
      unsetAccessToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};
