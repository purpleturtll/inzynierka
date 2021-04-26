import React, {useState} from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity,} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

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
      imageUrl: '../assets/cat.png'
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
      imageUrl: '../assets/cat.png'
    },
    {
      id: 3,
      name: 'Mia',
      type: 'pies',
      race: 'mieszaniec',
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
      imageUrl: '../assets/cat.png'
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

    <ScrollView>
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
          {/*TODO: Obrazki na przyciskach*/}
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
      <View style={cardStyles.cardContainer}>
        {animals.map((item) => {
          return(
            <View key={item.id}>
              <AnimalCard animal={item}/>
            </View>
          )
        })}
      </View>
      

      {/*<FlatList 
        contentContainerStyle={cardStyles.cardContainer}
        data={animals}
        renderItem={({ item }) => (
          <AnimalCard animal={item}/>    
        )}
        />*/}
    </View>
    </ScrollView>
    </View>   
    </View>
  )
}
export default HomeScreen;

//#362893

const AnimalCard = ({animal}) => {

  const onAnimalPress = ({animal}) => {

  }

  return(
    <View style={cardStyles.card}>
      <TouchableOpacity onPress={() => onAnimalPress({animal})}>
        {/*<Image source={require('../assets/cat.png')}/>*/}
        {/*info*/}
        <View>
          {/*blok tekstu*/}
          <View>
            {/*tytuł*/}
            <View style={cardStyles.headline}>
              <Text style={{fontWeight: 'bold'}}>{animal.name} </Text>
              <Text>{animal.postDate}</Text>
            </View>
            {/*TODO: wyświetlanie wieku*/}
            <Text>{animal.race}</Text>
            <Text>{animal.sex}, 3 lata, {animal.weight} kg</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

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
    borderRadius: 15
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
    paddingVertical: '8%'
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryButton: {
    backgroundColor: '#362893',
    width: 80,
    height: 80,
    margin: 10,
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
    paddingBottom: 5,
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
});

const cardStyles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#fff',
    shadowOffset:{width: 10, height: 10},
    shadowOpacity: 1,
    shadowRadius: 2
  },
  headline: {
    flexDirection: 'row',
    paddingVertical: 10
  }
});
