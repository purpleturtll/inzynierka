import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
    <View style={styles.header}>
    </View>
        <Text>Home</Text>
    </View>
  )
}
export default HomeScreen;

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
