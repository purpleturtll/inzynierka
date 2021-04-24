import React, { useState } from 'react';
import {
  View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';


const marginLeftText = '5%';
const marginBottomText = 5;

const RegistrationScreen = ({ navigation }) => {

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/settings.png')}
          style={styles.logo}
        />
      </View>
        <Text style={styles.title}>Rejestracja schroniska</Text>
        <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Nazwa schroniska</Text>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={styles.textInput}
        />

        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>NIP</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={styles.textInput}
          />
        </View>

        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Numer telefonu</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Adres e-mail</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Nazwa ulicy i numer budynku</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Kod pocztowy</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Miejscowość</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Hasło</Text>
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
                  style={{ marginTop: 3 }}

                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                  style={{ marginTop: 3 }}

                />
              }
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={{ marginLeft: marginLeftText, marginBottom: marginBottomText }}>Potwierdź hasło</Text>
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
                  style={{ marginTop: 3 }}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                  style={{ marginTop: 3 }}
                />
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('DoneRegistrationScreen')}>
            <Text style={{ color: '#fff' }}>Utwórz konto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={{ color: '#69667C', fontWeight: 'bold', marginVertical: 20 }}>Masz już konto?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginLeft: '7.5%'
  },
  header: {
    flex: 2
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30
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
