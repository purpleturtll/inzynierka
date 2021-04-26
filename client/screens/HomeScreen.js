import React, {useState} from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

const HomeScreen = ({ navigation }) => {

  const [animals, setAnimals] = useState([
    {
      id: 1,
      name: 'Angus',
      type: 'pies',
      race: 'mieszaniec',
      sex: 'male',
      postDate: '6/3/21',
      favourite: true,
      status: [{adoptable: true}, {urgent: true}],
      weight: 9,
      ageMonths: 156,
      city: 'Warszawa',
      location: 'Schronisko dla Bezdomnych Zwierząt w Warszawie',
      takeInDate: '20-11-2020',
      description: 'Opis Angusa'
    },
    {
      id: 2,
      name: 'Mruczek',
      type: 'kot',
      race: 'europejska',
      sex: 'male',
      postDate: '2/3/21',
      favourite: false,
      status: [{adoptable: true}],
      weight: 7,
      ageMonths: 60,
      city: 'Otwock',
      location: 'Schronisko dla Bezdomnych Zwierząt w Otwocku',
      takeInDate: '24-12-2020',
      description: 'Opis Mruczka'
    },
    {
      id: 3,
      name: 'Mia',
      type: 'pies',
      race: 'mieszaniec',
      sex: 'female',
      postDate: '1/3/21',
      favourite: false,
      status: [{urgent: true}],
      weight: 5,
      ageMonths: 10,
      city: 'Lublin',
      location: 'Schronisko dla Bezdomnych Zwierząt w Lublinie',
      takeInDate: '7-02-2021',
      description: 'Opis Mii'
    },
  ]);

const onFilterDogsPress = () => {

}

const onFilterCatsPress = () => {

}

const onFilterOtherPress = () => {

}

const onSeeMorePress = () => {

}

  return(
    <View style={styles.container}>
    <View style={styles.header}>

    {/*widok ekranu*/}
    <View style={styles.customContainer}>
      {/*pasek wyszukiwania*/}
      <View style={styles.searchbar}>
        <Icon name='search' color='#777'/>
        <TextInput style={styles.input}
        placeholder='Lorem ipsum ...'
        />
      </View>

      {/* kategorie zwierząt*/}
      <View>
        <Text style={styles.categoryTitle}>Kogo szukasz?</Text>
        <View style={styles.categoryButtonContainer}>
          {/*Psy*/}
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => onFilterDogsPress() }
          >
            <Text style={styles.categoryButtonText}>Psy</Text>
          </TouchableOpacity>
          
          {/*Koty*/}
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => onFilterCatsPress() }
          >
          {/*<View>
            <Image source={require('../assets/cat.png')}
            style={styles.categoryButtonImage}
            />
          </View>
          */}
            <Text style={styles.categoryButtonText}>Koty</Text>
          </TouchableOpacity>
          {/*Inne*/}
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => onFilterOtherPress() }
          >
            <Text style={styles.categoryButtonText}>Inne</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textElement}>
            <Text style={styles.latestText}>Ostatnio dodane</Text>
          </View>
          <TouchableOpacity 
            style={styles.textElement}
            onPress={() => onSeeMorePress()}
          >
            <Text style={styles.seeMore}>Zobacz więcej</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>

    </View>

    </View>   
    </View>
  )
}
export default HomeScreen;

//#362893

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },
  customContainer: {
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  button:{
    backgroundColor: '#E2E1E1',
    padding: 10,
    alignItems: 'center'
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#777',
    borderRadius: '15px'
  },
  input: {
    flex: 1,
    padding: 15
  },
  icon: {
    flex: 1,
    marginHorizontal: 3
  },
  categoryTitle: {
    fontSize: 25,
    paddingVertical: '2%'
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryButton: {
    backgroundColor: '#362893',
    width: '100px',
    height: '100px',
    margin: 10,
    borderRadius: 15,
    clipChildren: false
  },
  categoryButtonText: {
    fontSize: 18,
    color: 'white',
    paddingVertical: '35px',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  categoryButtonImage: {
    paddingBottom: 5,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textElement: {
    flex: 1
  },
  seeMore: {
    color: '#777',
    justifyContent: 'flex-end',
    fontSize: 18
  },
  latestText: {
    flex: 1,
    justifyContent: 'flex-start',
    fontSize: 20,
    paddingVertical: '2%',
    fontWeight: 'bold'
  },
});
