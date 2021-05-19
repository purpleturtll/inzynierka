import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import DataRow from '../components/DataRow';
import StatusDataRow from '../components/StatusDataRow'

const AnimalDetailsScreen = ({ route, navigation, onFavChange }) => {

  {/*TODO: Dane powinny być przechowywane globalnie, to tymczasowy antywzorzec - https://reactnavigation.org/docs/params/ */}
  const {
      id,
      name,
      type,
      race,
      sex,
      postDate,
      favourite,
      adoptable,
      urgent,
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
    <View>
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.imageView}>
          <Image 
            source={images.animalType[image]}
            style={styles.image}
          />
        </View>
        <View style={styles.groupedRow}>
          <DataRow label={'Typ'} data={type}/>
          <View style={styles.heartView}>
            <HeartIcon favourite={favourite}/>
          </View>
        </View>
        <DataRow label={'W typie rasy'} data={race}/>
        <DataRow label={'Płeć'} data={sex}/>
        {/*TODO - status*/}
        <StatusDataRow status={{adoptable, urgent}}/>
        <DataRow label={'Waga'} data={weight}/>
        <DataRow label={'Wiek'} data={ageMonths}/>
        <DataRow label={'Lokalizacja'} data={location}/>
        <DataRow label={'Data przyjęcia'} data={takeInDate}/>
      </View>
      </ScrollView>
    </View>
  )
}
export default AnimalDetailsScreen;

const HeartIcon = ({favourite}) => {
  if(favourite)
  {
    return(
        <View>
          <AntDesign name={'heart'} size={30} color='black'/> 
        </View>
    );
  }
  else 
  {
    return(
        <View>
          <AntDesign name={'hearto'} size={30} color='black'/> 
        </View>
    );
  }
}

//granatowy - #362893

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '10%',
  },
  imageView: {
    marginVertical: '5%',
    paddingBottom: 5,
    backgroundColor: '#0000',
    borderRadius: 15,
    elevation: 6,
    shadowColor: '#fff',
    shadowOffset:{width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  heartView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '5%'
  },
  groupedRow: {
    flex: 1,
    flexDirection: 'row',
  }
});