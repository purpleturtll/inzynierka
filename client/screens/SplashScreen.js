import React from "react";
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.paw}
        source={require('../assets/paw.png')}
        tintColor="#fff"
      />    
      </View>
  )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.2;

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#362893', 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paw: {
    width: height_logo,
    height: height_logo,
  }
});
