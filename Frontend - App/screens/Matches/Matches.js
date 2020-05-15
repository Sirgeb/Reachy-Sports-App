import React from 'react'
import { Image, View} from 'react-native'

class Matches extends React.Component {

  render() {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#ffffff'
      }}>
        <Image 
          source={require('../../assets/coming-soon.gif')} 
          resizeMode="contain" 
          style={{ height: 300, width: 300}}
        />
      </View>
    )
  }
}

export default Matches;
