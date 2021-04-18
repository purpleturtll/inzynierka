import React, {useState} from 'react';
import {
  View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';



const RegistrationScreen = ({ navigation }) => {

  const marginLeftText = '5%';
  const marginBottomText = 5;
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    passwordEye: true,
    passwordConfirmationEye: true
  });

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const updatePasswordEye = () => {
    setData({
      ...data,
      passwordEye: !data.passwordEye
    })
  }

  const updatePasswordConfirmationEye = () => {
    setData({
      ...data,
      passwordConfirmationEye: !data.passwordConfirmationEye
    })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
        <Text style={{marginLeft: marginLeftText, marginBottom: marginBottomText}}>Imię</Text>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={styles.textInput}
        />

      <View>
        <Text style={{marginLeft: marginLeftText, marginBottom: marginBottomText}}>Nazwisko</Text>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={styles.textInput}
        />
      </View>

      <View>
        <Text style={{marginLeft: marginLeftText, marginBottom: marginBottomText}}>Adres e-mail</Text>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={styles.textInput}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={{marginLeft: marginLeftText, marginBottom: marginBottomText}}>Hasło</Text>
        <View style={styles.passwordContainer}>
        <TextInput
          placeholderTextColor="#000"
          secureTextEntry={data.passwordEye ? true : false}
          style={styles.textInput, styles.textInputPass}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity
          onPress={updatePasswordEye}>
          {data.passwordEye ?

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
      </View>
      <View>
        <Text style={{marginLeft: marginLeftText, marginBottom: marginBottomText}}>Potwierdź hasło</Text>
        <View style={styles.passwordContainer}>
        <TextInput
          placeholderTextColor="#000"
          secureTextEntry={data.passwordConfirmationEye ? true : false}
          style={styles.textInput, styles.textInputPass}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity
          onPress={updatePasswordConfirmationEye}>
          {data.passwordConfirmationEye ?

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
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('TempScreen')}>
        <Text style={{color: '#fff'}}>Utwórz konto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={{color: '#69667C', fontWeight: '900', marginTop: 10}}>Masz już konto?</Text>
      </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  )
}
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginLeft: '5%'
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
   textAlign: 'center',
   marginTop: 20,
   marginBottom: 20
  },

  textInput: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
    marginBottom: 15,
  },

  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
    marginBottom: 15
  },
  textInputPass: {
    flex: 1,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  
  registerButton: {
    flexDirection: 'row',
    height: 50,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#362893',
    borderRadius: 20,
    padding: 10,
  },

});
