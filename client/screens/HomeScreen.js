import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import AnimalCard from '../components/AnimalCard'
import { AnimalDataContext } from '../contexts/AnimalContext'
import { UserContext } from '../contexts/UserContext'

export const onSeeMorePress = (navigation) => {
  if(navigation != undefined) navigation.navigate('SeeMoreScreen');
}

const HomeScreen = ({ navigation }) => {

  const animalCtx = useContext(AnimalDataContext);
  const userCtx = useContext(UserContext);
  var userId = userCtx.userData.userId;
  var token = userCtx.userData.token;

  function onFilterDogsPress(userId, token) {
    var params = new URLSearchParams({
      "animal-type": "pies",
      "user-id": userId,
    });

    if(userId && token) 
      animalCtx.updateAnimals(token, params);
  }

  function onFilterCatsPress() {
    var params = new URLSearchParams({
      "animal-type": "kot",
      "user-id": userId,
    });

    if(userId && token) 
      animalCtx.updateAnimals(token, params);
  }

  function onFilterOtherPress() {
    var params = new URLSearchParams({
      "animal-type": "gryzoń,gad,ptak,królik,inne",
      "user-id": userId,
    });

    if(userId && token) 
      animalCtx.updateAnimals(token, params);
  }

  return(
  <View>
    {/*widok ekranu*/}
    <ScrollView>
      <View style={styles.container}>
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
              onPress={() => onFilterDogsPress(userId, token)}
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
              testID={"SeeMoreButton"} 
              style={styles.textElement}
              onPress={() => onSeeMorePress(navigation)}
            >
              <Text style={styles.seeMore}>Zobacz więcej</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/*Lista zwierzaków*/}
        <View style={styles.cardContainer}>
          {animalCtx.animals.map((item) => {
            return(
              <View key={item.id}>
                <AnimalCard animalId={item.id}
                  navigation={navigation}
                />
              </View>
            )
          })}
        </View>
      
      </View>
    </ScrollView>
  </View>
  )
}
export default HomeScreen;

//#362893

const styles = StyleSheet.create({
  container: {
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