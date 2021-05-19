import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

const AnimalDetailsScreen = ({ route, navigation }) => {

  {/*TODO: Dane powinny być przechowywane globalnie, to tymczasowy antywzorzec - https://reactnavigation.org/docs/params/ */}
  const {
      id,
      name,
      type,
      race,
      sex,
      postDate,
      favourite,
      status,
      weight,
      ageMonths,
      city,
      location,
      takeInDate,
      description,
      imageUrl,
      image
  } = route.params;

  return(
    <View style={styles.container}>
    <View style={styles.header}>
    </View>
      <TouchableOpacity style={styles.button}>
        <Text>{ name }</Text>
      </TouchableOpacity>
    </View>
  )
}
export default AnimalDetailsScreen;

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
