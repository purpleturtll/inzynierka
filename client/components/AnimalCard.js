import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { AnimalDataContext } from '../contexts/AnimalContext';

export default AnimalCard = ({animal, navigation}) => {

    {/*stan lokalny zwierzaka, potrzebny do poprawnego renderingu*/}
    const [localState, setLocalState] = useState(animal);

    {/*funkcja aktualizująca stan globalny (kontekst AnimalDataContext)*/}
    const animalCtx = useContext(AnimalDataContext);

    {/*funkcja nawigująca do szczegółów zwierzaka (klik na obrazku AnimalCard)*/}
    const onAnimalPress = (anim) => {
        navigation.navigate('AnimalDetailsScreen', anim);
    }
  
    {/*mapowanie obrazów po animal.image (HomeScreen.js, tymczasowe)*/}
    const images = {
      animalType: {
        'cat1': require('../assets/cat_1.jpg'),
        'dog1': require('../assets/dog_1.jpg'),
        'dog2': require('../assets/dog_2.jpg'),
      }
    }

    {/*nazwy ikon serduszek*/}
    const hearts = {
      icon: {
        true: 'heart',
        false: 'hearto', 
      }
    }
  
    {/*karta*/}
    return(
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onAnimalPress(localState)}>
          <Image 
            source={images.animalType[localState.image]}
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
              <Text style={styles.headlineDate}>{localState.postDate}</Text>
            </View>
            {/*TODO: wyświetlanie wieku w miesiącach*/}
            <Text>{localState.race}</Text>
            <Text>{localState.sex}, {(localState.ageMonths/12).toFixed(0)} lat, {localState.weight} kg</Text>
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