import React, { useState } from 'react';
import {
  View, Image, Text, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';

const DoneRegistrationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.check}
        source={require('../assets/tick.png')}
        tintColor="#362893"
      />
      <Text style={styles.title}>Zrobione!</Text>
      <Text style={styles.subtitle}>Sprawdź swoją skrzynkę {"\n"} pocztową e-mail.</Text>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={{ color: '#fff', fontSize: 17 }}>Powrót</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DoneRegistrationScreen;
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: height * 0.14
  },
  check: {
    width: 230,
    height: 230
  },
  title: {
    marginTop: height * 0.04,
    marginBottom: height * 0.04,
    fontSize: 32,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  registerButton: {
    flexDirection: 'row',
    height: 54,
    width: '63%',
    marginTop: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#362893',
    borderRadius: 20,
    padding: 10,
  }
})
