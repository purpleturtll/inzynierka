import React, {useState} from 'react';
import { View,  StyleSheet, FlatList } from 'react-native';
import AnimalCard from '../components/AnimalCard'

const FollowedAnimalsScreen = ({ navigation }) => {
  
  const [animals, setAnimals] = useState([
    {
      id: '1',
      name: 'Angus',
      type: 'pies',
      race: 'mieszaniec',
      sex: 'samiec',
      postDate: '6/3/21',
      favourite: true,
      status: [{adoptable: true}, {urgent: true}],
      weight: 9,
      ageMonths: 156,
      city: 'Warszawa',
      location: 'Schronisko dla Bezdomnych Zwierząt w Warszawie',
      takeInDate: '20-11-2020',
      description: 'Opis Angusa',
      imageUrl: '',
      image: 'dog1'
    },
    {
      id: '2',
      name: 'Mruczek',
      type: 'kot',
      race: 'europejska',
      sex: 'samiec',
      postDate: '2/3/21',
      favourite: true,
      status: [{adoptable: true}],
      weight: 7,
      ageMonths: 60,
      city: 'Otwock',
      location: 'Schronisko dla Bezdomnych Zwierząt w Otwocku',
      takeInDate: '24-12-2020',
      description: 'Opis Mruczka',
      imageUrl: '',
      image: 'cat1'
    }
  ]);

  const handleFavChange = (id) => {
    animals.map(animal => {
      if(animal.id==id){
        setAnimals({
          ...animals,
          favourite: !animal.favourite,
      });
      }
      console.log(animal.favourite);
    })
  }
  
  return(
    <View style={styles.container}>
    <View style={styles.header}>

    {/*Lista zwierzaków*/}  
    <View style={{alignItems: 'center'}}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id }
        data={animals}
        renderItem={({ item }) => (
          <AnimalCard 
            animal={item}
            navigation={navigation} 
            onFavChange={() => handleFavChange}
          />
        )}
      />
    </View>
      
    </View>
    </View>
  )
}
export default FollowedAnimalsScreen;

//#362893

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },

  button:{
    backgroundColor: '#E2E1E1',
    padding: 10,
    alignItems: 'center'
  }
});
