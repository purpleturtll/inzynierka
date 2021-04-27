import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default AnimalCard = ({animal, onFavChange}) => {

    const onAnimalPress = ({animal}) => {
        {/*TODO*/}
    }
  
    {/*mapowanie obrazów po animal.image (HomeScreen.js, tymczasowe)*/}
    const images = {
      animalType: {
        'cat1': require('../assets/cat_1.jpg'),
        'dog1': require('../assets/dog_1.jpg'),
        'dog2': require('../assets/dog_2.jpg'),
      }
    }

    const hearts = {
      icon: {
        true: 'heart',
        false: 'hearto', 
      }
    }
  
    {/*karta*/}
    return(
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onAnimalPress({animal})}>
          <Image 
            source={images.animalType[animal.image]}
            style={styles.image}
          />
        </TouchableOpacity>
        {/*info*/}
        <View style={{padding: 10, flexDirection: 'row'}}>
          {/*blok tekstu*/}
          <View>
            {/*tytuł*/}
            <View style={styles.headline}>
              <Text style={styles.headlineName}>{animal.name} </Text>
              <Text style={styles.headlineDate}>{animal.postDate}</Text>
            </View>
            {/*TODO: wyświetlanie wieku w miesiącach*/}
            <Text>{animal.race}</Text>
            <Text>{animal.sex}, {(animal.ageMonths/12).toFixed(0)} lat, {animal.weight} kg</Text>
          </View>
          {/*TODO: onFavChange nie zmienia stanu/}
          {/*kolor serduszka #ff4242*/}
          <TouchableOpacity onPress={onFavChange(animal.favourite)}>
            <View style={styles.heart}>
              <AntDesign name={hearts.icon[animal.favourite]} size={30} color='black'/> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    card: {
      marginVertical: 20,
      backgroundColor: 'white',
      borderRadius: 15,
      elevation: 6,
      shadowColor: '#fff',
      shadowOffset:{width: 10, height: 10},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      overflow: 'hidden'
    },
    headline: {
      flexDirection: 'row',
      paddingTop: 3,
      paddingBottom: 5,
    },
    headlineName: {
      fontWeight: 'bold',
      fontSize: 16
    },
    headlineDate: {
      fontSize: 16,
    },
    image: {
      resizeMode: 'cover',
      width: 300,
      height: 200,
    },
    heart: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '35%',
      marginTop: 18
    }
  });