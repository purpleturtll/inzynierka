import React, {useState, useContext} from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, ScrollView
} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { AppContext } from '../contexts/AppContext'
import { AnimalDataContext } from '../contexts/AnimalContext';


const SignInScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState();
  const error = 'Niepoprawny e-mail lub hasło';
  var appCtx = useContext(AppContext);
  var animalCtx = useContext(AnimalDataContext);
  
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  const textInputChange = (val) => {
    if(val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      });
    }else{
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      });
    }
  }

  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val
    });
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  async function onSignInPress() {

    if(data.email == ""){
      setSignInError('E-mail nie może być pusty')
      return
    }
    else if(data.password == ""){
      setSignInError('Hasło nie może być puste')
      return
    }
    //Długość tymczasowo zmieniona na 3 dla wygody testowania
    else if(data.password.length < 3){
      setSignInError(error)
      return
    }

    var status, tokenStr = null;
    const res = await fetch('http://192.168.1.70:8080/auth/login', {
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }), 
      headers: {"Content-Type": "application/json"},
      method:'POST'
    })
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(body => {
      var jsonStr = JSON.stringify(body);
      tokenStr = JSON.parse(jsonStr).token;
      if(status == 200){
        appCtx.setLoggedIn(true);
        console.log('Received auth token: \n' + tokenStr);
        appCtx.setUserToken(tokenStr);
        navigation.navigate('AccountScreen');
      }
      else if(status == 401){
        setSignInError(error);
      }
    });
    if(tokenStr) animalCtx.updateAnimals(tokenStr);
  }

  return(
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/login.png')}
          style={styles.logo}
        />
        <Text style={{marginVertical: 18, color: 'red', fontSize: 15 }}>{signInError}</Text>
      </View>
      <View style={styles.body}>
        <TextInput 
          placeholder="Adres e-mail"
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handleEmailChange(val)}
        />
        </View>
      <View style={styles.passwordContainer}>
        <TextInput 
          placeholder="Hasło"
          placeholderTextColor="#000"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInputPass}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntry}>
          {data.secureTextEntry ?

        <Feather 
          name="eye-off"
          color="grey"
          size={20}
          style={{marginTop:3}}
        />
        :
        <Feather 
          name="eye"
          color="grey"
          size={20}
          style={{marginTop:3}}
        />
        }
      </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={onSignInPress}>
        <Text style={{color:'#fff', fontWeight: '900' }}>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color:'#000', fontWeight: '900' }} onPress={() => navigation.navigate('PasswordRecoveryScreen')}>Zapomniałeś hasła?</Text>
        </TouchableOpacity>
        <Text style={{color: '#000', marginVertical: 10}}>lub</Text>
        <TouchableOpacity style={styles.registerButton}  onPress={() => navigation.navigate('ChooseAccountTypeScreen')}>
        <Text style={{color:'#fff', fontWeight: '900' }}>Utwórz konto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
export default SignInScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.25;

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
  body: {
    flex: 3,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    height: 50,
    width: '30%',
    marginTop: 25,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#362893',
    borderRadius: 20,
    padding: 10,
  },
  registerButton: {
    flexDirection: 'row',
    height: 50,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5959',
    borderRadius: 20,
    padding: 10,
  },

  textInput: {
    marginLeft: '10%',
    marginBottom: 15,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
  },

  passwordContainer: {
    flexDirection: 'row',
    marginLeft: '10%',
    width: '80%',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
  },
  textInputPass: {
    flex: 1,
  },

  logo: {
    width: height_logo,
    height: height_logo,
    marginTop:20, 
  }
});
