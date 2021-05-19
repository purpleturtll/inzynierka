import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DataRow from '../components/DataRow';

const AnimalDetailsScreen = ({ route, navigation }) => {

  {/*TODO: Dane powinny być przechowywane globalnie, to tymczasowy antywzorzec - https://reactnavigation.org/docs/params/ */}
  const {
      id,
      name,
      type,
      race,
      sex,
      postDate,
      favourite,
      status,
      weight,
      ageMonths,
      city,
      location,
      takeInDate,
      description,
      imageUrl,
      image
  } = route.params;

  const images = {
    animalType: {
      'cat1': require('../assets/cat_1.jpg'),
      'dog1': require('../assets/dog_1.jpg'),
      'dog2': require('../assets/dog_2.jpg'),
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image 
          source={images.animalType[image]}
          style={styles.image}
        />
      </View>
      
      <DataRow label={'Typ'} data={type}/>
      <DataRow label={'W typie rasy'} data={race}/>
      <DataRow label={'Płeć'} data={sex}/>
      {/*TODO -status*/}
      <DataRow label={'Waga'} data={weight}/>
      <DataRow label={'Wiek'} data={ageMonths}/>
      <DataRow label={'Lokalizacja'} data={location}/>
      <DataRow label={'Data przyjęcia'} data={takeInDate}/>
    </View>
  )
}
export default AnimalDetailsScreen;


//granatowy - #362893

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '10%',
  },
  imageView: {
    marginVertical: '5%'
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
});