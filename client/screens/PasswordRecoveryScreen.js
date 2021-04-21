import React, {useState} from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, ScrollView
} from 'react-native';


const SignInScreen = ({ navigation }) => {

  return(
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/padlock.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Zapomniałeś hasła?</Text>
        <Text style={styles.subtitle}>Bez obaw! Wpisz swój adres e-mail, {"\n"} a my wyślemy na niego nowe hasło.</Text>
      </View>
      <View style={styles.body}>
        <TextInput 
          placeholder="Adres e-mail"
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={styles.textInput}
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('RegistrationScreen')}>
        <Text style={{color:'#fff', fontWeight: '900', fontSize: 18 }}>Wyślij</Text>
        </TouchableOpacity>
      </View>
        </View>
    </ScrollView>
  )
}
export default SignInScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.18;

//#362893

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },

  header: {
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },

  logo: {
    marginTop: height*0.07,
    marginBottom: height*0.05,
    width: height_logo,
    height: height_logo,
  },

  title: {
    fontSize: 23, 
    fontWeight: 'bold'
  },

  subtitle: {
    marginVertical: height*0.06,
    fontSize: 18,
    fontWeight: 'bold'
  },

  body: {
    flex: 1
  },
 
  buttonContainer: {
    alignItems: 'center',
  },

  loginButton: {
    flexDirection: 'row',
    height: 54,
    width: '60%',
    marginTop: 25,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#362893',
    borderRadius: 20,
    padding: 10,
  },
  textInput: {
    marginLeft: '15%',
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
    marginBottom: 20
  },

  
});
