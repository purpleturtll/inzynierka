import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import AnimalCard from '../components/AnimalCard'

const SeeMoreScreen = ({route, navigation}) => {

  {/*TODO: dane*/}
  var animalList = route.params;

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
  
          <View style={styles.textContainer}>
            <Text style={styles.textElement}>Znaleziono: {animalList.length}</Text>
            <TouchableOpacity>
              <Ionicons name="options" size={30} color="black" />
            </TouchableOpacity>
          </View>
          
          {/*Lista zwierzaków*/}  
          <View style={styles.cardContainer}>
            {animalList.map((item) => {
              return(
                <View key={item.id}>
                  <AnimalCard animal={item}
                    navigation={navigation}
                    onFavChange={() => {}}
                  />
                </View>
              )
            })}
          </View>
        
        </View>
      </ScrollView>
    </View>
  );
}

export default SeeMoreScreen;

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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 15
  },
  textElement: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16
  },
  cardContainer: {
    alignItems: 'center',
  },
});