import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AnimalCard from '../components/AnimalCard'

const SeeMoreScreen = ({route, navigation}) => {

  const [modalOpen, setModalOpen] = useState(false);
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
            <Ionicons 
              name="options"
              size={30} 
              color="black"
              onPress={() => setModalOpen(true)}
            />
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

      {/*Okno opcji filtrów*/}
      <Modal visible={modalOpen} style={styles.modal} animationType='slide'>
        <View style={styles.modalHeader}>
          <AntDesign
            name="close"
            size={20}
            color="black"
            onPress={() => setModalOpen(false)}
            style={styles.closeIcon}
          />
          <Text style={styles.modalTitle}>Filtr</Text>
          <TouchableOpacity onPress={() => {}}>
            <View>
              <Text style={styles.clearFilters}>Wyczyść filtry</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

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
  modal: {
    marginTop:'2%',
    backgroundColor: 'white'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    paddingVertical: 10
  },
  closeIcon: {
    marginLeft: 10
  },
  modalTitle: {
    flex: 1,
    marginLeft: 30,
    fontSize: 18
  },
  clearFilters: {
    marginRight: 10,
    fontWeight: 'bold',
  }
});