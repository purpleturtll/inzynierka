import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Button, LogBox} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import AnimalCard from '../components/AnimalCard'

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const SeeMoreScreen = ({ navigation }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [typeArrow, setTypeArrow] = useState('down');
  const [sexArrow, setSexArrow] = useState('down');
  const [locationArrow, setLocationArrow] = useState('down');
  const [raceArrow, setRaceArrow] = useState('down');
  const [statusArrow, setStatusArrow] = useState('down');

  {/*Stan zaznaczonych filtrów - null oznacza, że filtr powinien być zignorowany*/}
  {/*TODO: globalne zarządzanie stanem filtrów*/}
  const [filters, setFilters] = useState({
    type: null,
    sex: null,
    location: null,
    age: null,
    weight: null,
    race: null,
    adoptable: null,
    urgent: null
  });

  function clearFilters() {
    setFilters(
      {
        type: null,
        sex: null,
        location: null,
        age: null,
        weight: null,
        race: null,
        adoptable: null,
        urgent: null
      }
    );
  }

  function setStatus(id) {
    switch(id)
    {
      case '1':
        if(filters.urgent === false || filters.urgent == null)
          setFilters({...filters, urgent: true});
        else 
          setFilters({...filters, urgent: false});
        break;
      case '2':
        if(filters.adoptable === false || filters.adoptable == null)
          setFilters({...filters, urgent: true});
        else
          setFilters({...filters, urgent: false});
        break;
      default: break;
    }
  }

  function setFilterValue(fieldName, value) {
    switch(fieldName)
    {
      case 'type':
        setFilters({...filters, type: value});
        break;
      case 'sex':
        setFilters({...filters, sex: value});
        break;
      case 'location':
        setFilters({...filters, location: value});
        break;
      case 'status':
        setStatus(value);
        break;
      case 'age':
        setFilters({...filters, age: value});
        break;
      case 'weight':
        setFilters({...filters, weight: value});
        break;
      case 'race':
        setFilters({...filters, race: value});
        break;
      default:
        break;
    }
  }

  {/*Typy zwierząt*/}
  const animalTypes = [
    {id: '1', label: 'Psy'},
    {id: '2', label: 'Koty'},
    {id: '3', label: 'Gryzonie'},
    {id: '4', label: 'Ptaki'},
    {id: '5', label: 'Gady'},
    {id: '6', label: 'Króliki'},
    {id: '7', label: 'Inne'},
  ];

  {/*Płci zwierząt*/}
  const animalSexes = [
    {id: '1', label: 'samica'},
    {id: '2', label: 'samiec'}
  ];

  {/*TODO: lista schronisk docelowo pobierana z global store*/}
  const shelters = [
    {id: '1', label: 'Schronisko 1'},
    {id: '2', label: 'Schronisko 2'},
    {id: '3', label: 'Schronisko 3'}
  ];

  {/*Wiek, wartości potrzebne przy customowych filtrach, zbędne przy predefiniowanych*/}
  const ageCategories = [
    {id: '1', label: 'do 1 roku', monthsMin: 0, monthsMax: 11},
    {id: '2', label: '1 - 4 lata', monthsMin: 12, monthsMax: 59},
    {id: '3', label: '5 - 9 lata', monthsMin: 60, monthsMax: 119},
    {id: '4', label: '10+ lat', monthsMin: 120, monthsMax: null},
  ];

  const weightCategories = [
    {id: '1', label: 'do 5 kg'},
    {id: '2', label: '5 - 14 kg'},
    {id: '3', label: '15 - 24 kg'},
    {id: '4', label: '25 - 44 kg'},
    {id: '5', label: '45+ kg'},
  ];

  const catRaces = [
    {id: '1', label: 'Europejska'},
    {id: '2', label: 'Syryjska'},
  ];

  const dogRaces = [
    {id: '101', label: 'Amstaff/Pitbull'},
    {id: '102', label: 'Bernardyn'},
    {id: '103', label: 'Cocker spaniel'},
    {id: '104', label: 'Foksterier'},
    {id: '105', label: 'Husky'},
    {id: '106', label: 'Jamnik'},
    {id: '107', label: 'Labrador'},
    {id: '108', label: 'Mieszaniec'},
    {id: '109', label: 'Owczarek\nkaukaski'},
    {id: '110', label: 'Owczarek\nniemiecki'},
    {id: '111', label: 'Owczarek\npodhalański'},
    {id: '112', label: 'Sznaucer'},
    {id: '113', label: 'Terier'},
    {id: '114', label: 'Inne'},
  ];

  const statuses = [
    {id: '1', label: 'pilne'},
    {id: '2', label: 'do adopcji'},
  ];

  {/*TODO: dane zwierząt docelowo pobierane z global store*/}
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
      <ScrollView>
        {/*Nagłówek*/}
        <View style={styles.modalHeader}>
          <AntDesign
            name="close"
            size={20}
            color="black"
            onPress={() => setModalOpen(false)}
            style={styles.closeIcon}
          />
          <Text style={styles.modalTitle}>Filtr</Text>
          <TouchableOpacity onPress={() => clearFilters()}>
            <View>
              <Text style={styles.clearFilters}>Wyczyść filtry</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*Typ*/}
        <Collapse onToggle={() => {if(typeArrow == 'down') setTypeArrow('up'); else setTypeArrow('down')}}>
          <CollapseHeader style={styles.collapseHeader}>
            <View style={{flex: 1}}>
              <Text style={styles.headerTitle}>Typ</Text>
            </View>
            <AntDesign name={typeArrow} size={24} />
          </CollapseHeader>
          <CollapseBody style={styles.collapseBody}>
            <FlatList 
              numColumns={3}
              keyExtractor={(item) => item.id }
              data={animalTypes}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setFilterValue('type', item.id)}>
                  <Label name={item.label}/>
                </TouchableOpacity>
              )}
            />
          </CollapseBody>
        </Collapse>

        {/*Płeć*/}
        <Collapse onToggle={() => {if(sexArrow == 'down') setSexArrow('up'); else setSexArrow('down')}}>
          <CollapseHeader style={styles.collapseHeader}>
            <View style={{flex: 1}}>
              <Text style={styles.headerTitle}>Płeć</Text>
            </View>
            <AntDesign name={sexArrow} size={24} />
          </CollapseHeader>
          <CollapseBody style={styles.collapseBody}>
            <FlatList 
              contentContainerStyle={{alignItems: 'center'}}
              numColumns={2}
              keyExtractor={(item) => item.id }
              data={animalSexes}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setFilterValue('sex', item.id)}>
                  <Label name={item.label}/>
                </TouchableOpacity>
              )}
            />
          </CollapseBody>
        </Collapse>

        {/*Lokalizacja*/}
        <Collapse onToggle={() => {if(locationArrow == 'down') setLocationArrow('up'); else setLocationArrow('down')}}>
          <CollapseHeader style={styles.collapseHeader}>
            <View style={{flex: 1}}>
              <Text style={styles.headerTitle}>Lokalizacja</Text>
            </View>
            <AntDesign name={locationArrow} size={24} />
          </CollapseHeader>
          <CollapseBody style={styles.collapseBody}>
            <FlatList 
              contentContainerStyle={{alignItems: 'center'}}
              numColumns={1}
              keyExtractor={(item) => item.id }
              data={shelters}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setFilterValue('location', item.id)}>
                  <Label name={item.label}/>
                </TouchableOpacity>
                
              )}
            />
          </CollapseBody>
        </Collapse>

        {/*Status*/}
        <Collapse onToggle={() => {if(statusArrow == 'down') setStatusArrow('up'); else setStatusArrow('down')}}>
          <CollapseHeader style={styles.collapseHeader}>
            <View style={{flex: 1}}>
              <Text style={styles.headerTitle}>Status</Text>
            </View>
            <AntDesign name={statusArrow} size={24} />
          </CollapseHeader>
          <CollapseBody style={styles.collapseBody}>
            <FlatList 
              contentContainerStyle={{alignItems: 'center'}}
              numColumns={2}
              keyExtractor={(item) => item.id }
              data={statuses}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setFilterValue('status', item.id)}>
                  <Label name={item.label}/>
                </TouchableOpacity>
              )}
            />
          </CollapseBody>
        </Collapse>

        {/*Wiek*/}
        <View>
          <View style={styles.standardHeader}>
            <Text style={styles.headerTitle}>Wiek</Text>
          </View>
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20, marginLeft: 10}}
            keyExtractor={(item) => item.id }
            data={ageCategories}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setFilterValue('age', item.id)}>
                <Label name={item.label}/>
              </TouchableOpacity>
            )}
          />
        </View>

        {/*Waga*/}
        <View>
          <View style={styles.standardHeader}>
            <Text style={styles.headerTitle}>Waga</Text>
          </View>
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20, marginLeft: 10}}
            keyExtractor={(item) => item.id }
            data={weightCategories}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setFilterValue('weight', item.id)}>
                <Label name={item.label}/>
              </TouchableOpacity>
            )}
          />
        </View>

        {/*Rasa*/}
        <Collapse onToggle={() => {if(raceArrow == 'down') setRaceArrow('up'); else setRaceArrow('down')}}>
          <CollapseHeader style={styles.collapseHeader}>
            <View style={{flex: 1}}>
              <Text style={styles.headerTitle}>W typie rasy</Text>
            </View>
            <AntDesign name={raceArrow} size={24} />
          </CollapseHeader>
          <CollapseBody style={styles.collapseBody}>
            <View style={styles.raceCategoriesContainer}>
              <Text style={{fontWeight: 'bold'}}>Kot</Text>
              <FlatList 
                contentContainerStyle={{alignItems: 'center', marginLeft: 30}}
                numColumns={2}
                keyExtractor={(item) => item.id }
                data={catRaces}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => setFilterValue('race', item.id)}>
                    <AlignedLabel name={item.label}/>
                  </TouchableOpacity>
                )}
              />
              <Text style={{fontWeight: 'bold'}}>Pies</Text>
              <View style={{flex: 1, alignItems: 'center'}}>
                <FlatList 
                  contentContainerStyle={{alignItems: 'center', marginLeft: 30}}
                  numColumns={2}
                  keyExtractor={(item) => item.id }
                  data={dogRaces}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => setFilterValue('race', item.id)}>
                      <AlignedLabel name={item.label}/>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </CollapseBody>
        </Collapse>

        {/*Pokaż wyniki*/}
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.showResultsButton}>
              <Text style={{color: 'white', textAlign: 'center'}}>Pokaż wyniki</Text>
          </View>
        </TouchableOpacity>

        {/*Testy stanu*/}
        <View>
          <Text style={{fontWeight: 'bold'}}>Debug</Text>
          <Text>Typ: {filters.type}</Text>
          <Text>Płeć: {filters.sex}</Text>
          <Text>Lokalizacja: {filters.location}</Text>
          <Text>Wiek: {filters.age}</Text>
          <Text>Waga: {filters.weight}</Text>
          <Text>Rasa: {filters.race}</Text>
          {/*wartości typu boolean nie są renderowane*/}
          <Text>Status pilne: {filters.urgent}</Text>
          <Text>Status do adopcji: {filters.adoptable}</Text>
        </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

export default SeeMoreScreen;

const Label = ({name}) => {
  return(
    <View style={styles.label}>
      <Text style={{textAlign: 'center'}}>{name}</Text>
    </View>
  );
}

const AlignedLabel = ({name}) => {
  return(
      <View style={styles.alignedLabel}>
        <Text style={{textAlign: 'center'}}>{name}</Text>
      </View>
  );
}

const RaceLists = ({cats, dogs}) => {
  return(
    <View style={styles.raceCategoriesContainer}>
      <Text style={{fontWeight: 'bold'}}>Kot</Text>
      <FlatList 
        contentContainerStyle={{alignItems: 'center', marginLeft: 30}}
        numColumns={2}
        keyExtractor={(item) => item.id }
        data={cats}
        renderItem={({item}) => (<AlignedLabel name={item.label}/>)}
      />
      <Text style={{fontWeight: 'bold'}}>Pies</Text>
      <View style={{flex: 1, alignItems: 'center'}}>
        <FlatList 
          contentContainerStyle={{alignItems: 'center', marginLeft: 30}}
          numColumns={2}
          keyExtractor={(item) => item.id }
          data={dogs}
          renderItem={({item}) => (<AlignedLabel name={item.label}/>)}
        />
      </View>
    </View>
  );
}

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
  },
  collapseHeader: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  label: {
    marginLeft: 15,
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
  },
  collapseBody: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  standardHeader: {
      flexDirection: 'row',
      marginHorizontal: 30,
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 10
  },
  alignedLabel: {
    flex: 1,
    width: 100,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    justifyContent: 'center'
  },
  raceCategoriesContainer: {
    marginLeft: 10
  },
  showResultsButton: {
    padding: 30,
    backgroundColor: '#362893'
  }
});