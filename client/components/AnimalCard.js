import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { AnimalDataContext } from '../contexts/AnimalContext';

export default AnimalCard = ({animal, navigation}) => {

    {/*Stan lokalny zwierzaka, potrzebny do poprawnego renderingu*/}
    const [localState, setLocalState] = useState(animal);

    {/*Kontekst zwierząt*/}
    const animalCtx = useContext(AnimalDataContext);

    {/*Funkcja nawigująca do AnimalDetailsScreen (klik na obrazku AnimalCard)*/}
    function onAnimalPress(anim) {
        navigation.navigate('AnimalDetailsScreen', anim);
    }

    {/*Pomocnicza*/}
    function age2Polish(age) {
      switch(age) {
        case 1: 
          return 'rok';
        case 2:
        case 3:
        case 4:
          return 'lata';
        default:
          return 'lat';
      }
    }
  
    {/*Mapowanie obrazów po animal.type (HomeScreen.js, tymczasowe)*/}
    const images = {
      animalType: {
        'kot': require('../assets/cat_1.jpg'),
        'pies': require('../assets/dog_1.jpg'),
        'gad': require('../assets/dog_2.jpg'),
      }
    }

    {/*Nazwy ikon serduszek*/}
    const hearts = {
      icon: {
        true: 'heart',
        false: 'hearto', 
      }
    }
  
    {/*Karta*/}
    return(
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onAnimalPress(localState)}>
          <Image 
            source={images.animalType[localState.type]}
            style={styles.image}
          />
        </TouchableOpacity>
        {/*info*/}
        <View style={{padding: 10, flexDirection: 'row'}}>
          {/*blok tekstu*/}
          <View>
            {/*tytuł*/}
            <View style={styles.headline}>
              <Text style={styles.headlineName}>{localState.name} </Text>
              <Text style={styles.headlineDate}>{localState.admission_date}</Text>
            </View>
            {/*TODO: wyświetlanie wieku w miesiącach*/}
            <Text>{localState.breed}</Text>
            <Text>{localState.sex}, {localState.age} {age2Polish(localState.age)}, {localState.weight} kg</Text>
          </View>
          {/*kolor serduszka #ff4242*/}
          <TouchableOpacity onPress={() => {
            {/*stan lokalny w AnimalCard*/}
            setLocalState({...localState, favourite: !localState.favourite});
            {/*stan globalny w AnimalDataContext*/}
            animalCtx.updateFavourite(localState.id);
          }}>
            <View style={styles.heart}>
              <AntDesign name={hearts.icon[localState.favourite]} size={30} color='black'/> 
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