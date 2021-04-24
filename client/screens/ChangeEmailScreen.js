import React from 'react';
import {
  View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions
} from 'react-native';

const marginLeftText = '5%';
const marginBottomText = 5;

const ChangeEmailScreen = ({ navigation }) => {

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.body}>

          <Text style={styles.title}>Zmiana adresu e-mail</Text>
          <Text style={styles.inputTitle}>Nowy adres e-mail</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={styles.textInput}
          />
          <View>
            <Text style={styles.inputTitle}>Wpisz hasło</Text>
            <TextInput
              placeholderTextColor="#000"
              placeholderStyle={{}}
              style={styles.textInput}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('ChangedEmailScreen')}>
              <Text style={{ color: '#fff', fontSize: 17 }}>Zapisz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default ChangeEmailScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.19;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginLeft: '7.5%'
  },
  header: {
    flex: 2,
    alignItems: 'center'
  },
  logo: {
    width: height_logo,
    height: height_logo,
    marginTop: height * 0.04
  },
  body: {
    flex: 4
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.04,
    marginBottom: height * 0.06
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: marginLeftText,
    marginBottom: marginBottomText,
  },
  textInput: {
    width: '95%',
    marginLeft: '2.5%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: height * 0.03
  },
  registerButton: {
    flexDirection: 'row',
    height: 50,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#362893',
    borderRadius: 20,
    padding: 10,
  },
});
