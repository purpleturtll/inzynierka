import React, {useState} from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity,} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import AnimalCard from '../components/AnimalCard'

const HomeScreen = ({ navigation }) => {

  const [animals, setAnimals] = useState([
    {
      id: 1,
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
      id: 2,
      name: 'Mruczek',
      type: 'kot',
      race: 'europejska',
      sex: 'samiec',
      postDate: '2/3/21',
      favourite: false,
      status: [{adoptable: true}],
      weight: 7,
      ageMonths: 60,
      city: 'Otwock',
      location: 'Schronisko dla Bezdomnych Zwierząt w Otwocku',
      takeInDate: '24-12-2020',
      description: 'Opis Mruczka',
      imageUrl: '',
      image: 'cat1'
    },
    {
      id: 3,
      name: 'Mia',
      type: 'pies',
      race: 'buldog',
      sex: 'samica',
      postDate: '1/3/21',
      favourite: false,
      status: [{urgent: true}],
      weight: 5,
      ageMonths: 10,
      city: 'Lublin',
      location: 'Schronisko dla Bezdomnych Zwierząt w Lublinie',
      takeInDate: '7-02-2021',
      description: 'Opis Mii',
      imageUrl: '',
      image: 'dog2'
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
    <ScrollView>
    <View style={styles.customContainer}>
      {/*pasek wyszukiwania*/}
      <View style={styles.searchbar}>
        <Icon name='search' color='#777' size={30} style={styles.searchIcon}/>
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
            style={styles.categoryButtonView}
            onPress={() => onFilterDogsPress()}
          >
            <View style={styles.categoryButton}>
             <Text style={styles.categoryButtonText}>Psy</Text>
            </View>
            <Image 
              source={require('../assets/dog_homepage.png')}
              style={styles.categoryButtonImage}
            />
          </TouchableOpacity>
          
          
          {/*Koty*/}
          <TouchableOpacity 
            style={styles.categoryButtonView}
            onPress={() => onFilterCatsPress()}
          >
            <View style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Koty</Text>
            </View>
            <Image 
              source={require('../assets/cat_homepage.png')}
              style={styles.categoryButtonImage}
            />
          </TouchableOpacity>
          

          {/*Inne*/}
          <TouchableOpacity 
            style={styles.categoryButtonView}
            onPress={() => onFilterOtherPress()}
          >
            <View style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Inne</Text>
            </View>
            <Image 
              source={require('../assets/hamster_homepage.png')}
              style={styles.categoryButtonImage}
            />
          </TouchableOpacity>
          

        </View>

        {/*"Ostatnio dodane" i "Zobacz więcej"*/}
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
      
      {/*Lista zwierzaków*/}  
      <View style={styles.cardContainer}>
        {animals.map((item) => {
          return(
            <View key={item.id}>
              <AnimalCard animal={item}/>
            </View>
          )
        })}
      </View>
    
    </View>
    </ScrollView>
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
  searchIcon:{
    paddingLeft: 8,
    paddingTop: 6,
    paddingBottom: 3,
    fontWeight: 'bold'
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    borderWidth: 1.7,
    borderColor: '#555',
    borderRadius: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  icon: {
    flex: 1,
    marginHorizontal: 3
  },
  categoryTitle: {
    fontSize: 25,
    paddingVertical: '8%'
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryButtonView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%'
  },
  categoryButton: {
    backgroundColor: '#362893',
    width: 80,
    height: 80,
    marginHorizontal: 10,
    marginTop: 45,
    marginBottom: 20,
    borderRadius: 15,
  },
  categoryButtonText: {
    fontSize: 18,
    color: 'white',
    paddingVertical: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  categoryButtonImage: {
    position: 'absolute',
    top: 0,
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  textElement: {
    flex: 1,
    paddingVertical: 5,
  },
  seeMore: {
    justifyContent: 'flex-end',
    paddingTop: 3,
    fontSize: 15,
    color: '#777',
  },
  latestText: {
    justifyContent: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardContainer: {
    alignItems: 'center',
  },
});