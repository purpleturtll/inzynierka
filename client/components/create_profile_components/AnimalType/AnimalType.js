import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';


function AnimalType({ changeAnimalType, profileError, animalTypes, animalTypeFilter, unselected }) {
  return (
    <View>
      <View style={styles.standardHeader}>
        <Text style={[styles.marginsText, styles.headerTitle]}>Typ</Text>
      </View>
      <FlatList
        numColumns={4}
        contentContainerStyle={
          { paddingHorizontal: 20 }}
        keyExtractor={(item) => item.id}
        data={animalTypes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            // setFilterValue('type', item.id);
            // setAnimalTypeFilter(item.id);
            // setBreedFilter(undefined); -> przeniesione do handleAnimalTypeChange
            changeAnimalType(item.id);
          }}>
            {animalTypeFilter == item.id ? <Text style={[styles.label, styles.selected]}>{item.label}</Text> : <Text style={[styles.label]}>{item.label}</Text>}
          </TouchableOpacity>
        )}
      />
      {profileError.unselectedAnimalType && <Text style={[styles.error]}>{unselected}</Text>}
    </View>
  );
}
export default AnimalType;
