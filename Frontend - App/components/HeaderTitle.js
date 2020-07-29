import React from 'react';
import { View, Text } from 'react-native'
import styles from '../styles';

const HeaderTitle = ({ title }) => {
  return (
    <View>
      <Text style={{ color: styles.white, fontSize: 18}}>
        { title }
      </Text>
    </View>
  )
}

export default HeaderTitle;
