import React, { useState } from 'react';
import { View,  StyleSheet, FlatList, Text } from 'react-native';
import AnimalCard from '../components/AnimalCard'
import { useAnimalData } from '../contexts/AnimalContexts';

const FollowedAnimalsScreen = ({ navigation }) => {
  
  const favourites = useAnimalData().filter(function(item){return item.favourite == true});
  
  const [state, setState] = useState(favourites);

  function CountToPolish(count) {
    switch(count)
    {
      case 0: return "Nie masz jeszcze ulubieńców.";
      case 1: return "Masz jednego ulubieńca:";
      default: return `Masz ${count} ulubieńców:`;
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>

        {/*Lista zwierzaków*/}  
        <View style={{alignItems: 'center'}}>
          <Text style={styles.infoText}>{CountToPolish(favourites.length)}</Text>
          <FlatList 
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={favourites}
            renderItem={({ item }) => (
              <AnimalCard 
                animal={item}
                navigation={navigation}
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
  },
  infoText: {
    fontSize: 25,
    paddingTop: '5%',
    alignItems: 'stretch'
  },
});
