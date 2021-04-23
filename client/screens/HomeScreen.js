import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

const TempScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
    <View style={styles.header}>
    </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignInScreen')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}
export default TempScreen;

//#362893

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },

  button:{
    backgroundColor: '#E2E1E1',
    padding: 10,
    alignItems: 'center'
  }
});
