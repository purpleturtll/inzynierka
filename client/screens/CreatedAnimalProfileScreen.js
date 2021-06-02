import React from 'react';
import {
  View, Image, Text, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';

const CreatedAnimalProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.check}
        source={require('../assets/animal-shelter.png')}
      />
      <Text style={styles.title}>Ogłoszenie zostało dodane!</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('SignInScreen')}>
        <Image style={styles.addIcon}
          source={require('../assets/add.png')}
          tintColor="#fff"/>
        <Text style={{ color: '#fff', fontSize: 19 }}>Dodaj kolejne</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={{ color: '#69667C', fontWeight:'bold', fontSize: 19 }}>Powrót</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreatedAnimalProfileScreen;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: height * 0.05,
  },
  check: {
    width: 170,
    height: 170
  },
  title: {
    marginTop: height * 0.04,
    marginBottom: height * 0.04,
    fontSize: 26,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addIcon: {
    marginLeft: 30,
    marginRight: 15,
    width: 40,
    height: 40,
  },
  addButton: {
    flexDirection: 'row',
    marginTop: 20,
    width: width * 0.6,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#362893',
  },
  returnButton: {
    flexDirection: 'row',
    paddingVertical: 15,
    width: width * 0.35,
    marginTop: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#69667C',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
  }
})
