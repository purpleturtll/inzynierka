import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';

function AnimalSex({ changeAnimalSex, profileError, animalSexes, animalSexFilter}){
  return(

    <View>
    <View style={styles.standardHeader}>
      <Text style={[styles.marginsText, styles.headerTitle]}>Płeć</Text>
    </View>
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      keyExtractor={(item) => item.id}
      data={animalSexes}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {changeAnimalSex(item.id)}}>
          {animalSexFilter == item.id ? <Text style={[styles.label, styles.selected]}>{item.label}</Text> : <Text style={[styles.label]}>{item.label}</Text>}
        </TouchableOpacity>
      )}
    />
    {profileError.unselectedSex && <Text style={[styles.error]}>{unselected}</Text>}
  </View>
  );
}

export default AnimalSex;
