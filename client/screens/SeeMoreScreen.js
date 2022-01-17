import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  LogBox
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import AnimalCard from "../components/AnimalCard";
import { AnimalDataContext } from "../contexts/AnimalContext";
import { FilterContext } from "../contexts/FilterContext";
import { UserContext } from "../contexts/UserContext";
import Constants from "expo-constants";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
const apiUrl = Constants.manifest.extra.apiUrl;

const SeeMoreScreen = ({ navigation }) => {
  {
    /*Stany GUI*/
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [typeArrow, setTypeArrow] = useState("down");
  const [sexArrow, setSexArrow] = useState("down");
  const [locationArrow, setLocationArrow] = useState("down");
  const [raceArrow, setRaceArrow] = useState("down");
  const [statusArrow, setStatusArrow] = useState("down");
  const [search, setSearch] = useState("");

  const onChangeSearch = (value) => {
    setSearch(value);
  }

  const onSubmit = () => {
    var params = new URLSearchParams();
    params.append("search", search);
    animalCtx.updateAnimals(token, params);
  }

  {
    /*Globalny kontekst zwierząt*/
  }
  const animalCtx = useContext(AnimalDataContext);
  {
    /*Globalny kontekst filtrów*/
  }
  const filterCtx = useContext(FilterContext);
  {
    /*Globalny kontekst użytkownika*/
  }
  const userCtx = useContext(UserContext);

  var token = userCtx.userData.token;

  {
    /*Czyści wszystkie filtry*/
  }
  {
    /*Stan zaznaczonych filtrów - null oznacza, że filtr powinien być zignorowany*/
  }
  function clearFilters() {
    filterCtx.setFilters({
      type: null,
      sex: null,
      city: null,
      age_from: null,
      age_to: null,
      weight_from: null,
      weight_to: null,
      breed: null,
      adoptable: null,
      recently_found: null,
      //TODO: implementacja serwera
      is_sterilized: null,
      is_vaccinated: null,
    });
  }

  {
    /*Ustawia UI okna modalnego do tworzenia filtrów*/
  }
  function openModal() {
    setTypeArrow("down");
    setSexArrow("down");
    setLocationArrow("down");
    setStatusArrow("down");
    setRaceArrow("down");
    clearFilters();
    setModalOpen(true);
  }

  {
    /*Pomocniczy enum dozwolonych pól filtrów*/
  }
  const FILTER_FIELD = {
    TYPE: "type",
    SEX: "sex",
    CITY: "city",
    STATUS: "status",
    AGE: "age",
    WEIGHT: "weight",
    BREED: "breed",
    //TODO
    STERILIZED: "is_sterilized",
    VAXXED: "is_vaccinated",
  };

  {
    /*Typy zwierząt*/
  }
  const animalTypes = [
    { id: "1", value: "pies", label: "Psy" },
    { id: "2", value: "kot", label: "Koty" },
    { id: "3", value: "gryzoń", label: "Gryzonie" },
    { id: "4", value: "gad", label: "Gady" },
    { id: "5", value: "ptak", label: "Ptaki" },
    { id: "6", value: "królik", label: "Króliki" },
    { id: "7", value: "inne", label: "Inne" },
  ];

  {
    /*Płci zwierząt*/
  }
  const animalSexes = [
    { id: "1", label: "samica" },
    { id: "2", label: "samiec" },
  ];

  {
    /*TODO: shelter API*/
  }
  const shelters = [
    { id: "1", value: "Poznań", label: "Schronisko 1 w Poznaniu" },
    { id: "2", value: "Warszawa", label: "Schronisko 2 w Warszawie" },
    { id: "3", value: "Kraków", label: "Schronisko 3 w Krakowie" },
  ];

  {
    /*Przedziały wiekowe, maksymalny wiek to 200 lat*/
  }
  const ageCategories = [
    { id: "1", label: "do 1 roku", ageFrom: 0, ageTo: 11 },
    { id: "2", label: "1 - 4 lata", ageFrom: 12, ageTo: 59 },
    { id: "3", label: "5 - 9 lata", ageFrom: 60, ageTo: 119 },
    { id: "4", label: "10+ lat", ageFrom: 120, ageTo: 2400 },
  ];

  {
    /*Kategorie wagowe, maksymalna waga to tona*/
  }
  const weightCategories = [
    { id: "1", label: "do 5 kg", weightFrom: 0, weightTo: 4999 },
    { id: "2", label: "5 - 14 kg", weightFrom: 5000, weightTo: 14999 },
    { id: "3", label: "15 - 24 kg", weightFrom: 15000, weightTo: 24999 },
    { id: "4", label: "25 - 44 kg", weightFrom: 25000, weightTo: 44999 },
    { id: "5", label: "45+ kg", weightFrom: 45000, weightTo: 65000 },
  ];

  {
    /*TODO: breed API, rasy różnych gatunków*/
  }
  const breeds = {
    cats: [     // Koty
      { id: "1", value: "europejska", label: "Europejska" },
      { id: "2", value: "syryjska", label: "Syryjska" }
    ],
    // Psy
    dogs: [
      { id: "100", value: "mieszaniec", label: "Mieszaniec" },
      { id: "101", value: "amstaff/pitbull", label: "Amstaff/Pitbull" },
      { id: "102", value: "bernardyn", label: "Bernardyn" },
      { id: "103", value: "cocker spaniel", label: "Cocker spaniel" },
      { id: "104", value: "foksterier", label: "Foksterier" },
      { id: "105", value: "husky", label: "Husky" },
      { id: "106", value: "jamnik", label: "Jamnik" },
      { id: "107", value: "labrador", label: "Labrador" },
      { id: "108", value: "owczarek kaukaski", label: "Owczarek\nkaukaski" },
      { id: "109", value: "owczarek niemiecki", label: "Owczarek\nniemiecki" },
      {
        id: "110",
        value: "owczarek podhalański",
        label: "Owczarek\npodhalański",
      },
      { id: "111", value: "sznaucer", label: "Sznaucer" },
      { id: "112", value: "terier", label: "Terier" },
    ]
  };

  {
    /*Dostępne statusy*/
  }
  const statuses = [
    { id: "1", label: "pilne" },
    { id: "2", label: "do adopcji" },
  ];

  {
    /*Ustawia statusy filtrów*/
  }
  function setStatus(id) {
    switch (id) {
      case "1":
        if (
          filterCtx.filters.urgent === false ||
          filterCtx.filters.urgent == null
        )
          filterCtx.setFilters({ ...filterCtx.filters, urgent: true });
        else filterCtx.setFilters({ ...filterCtx.filters, urgent: false });
        break;
      case "2":
        if (
          filterCtx.filters.adoptable === false ||
          filterCtx.filters.adoptable == null
        )
          filterCtx.setFilters({ ...filterCtx.filters, adoptable: true });
        else filterCtx.setFilters({ ...filterCtx.filters, adoptable: false });
        break;
      default:
        break;
    }
  }

  {
    /*Ustawia wartość podanego pola*/
  }
  function setFilterValue(fieldName, value) {
    var category;
    switch (fieldName) {
      case FILTER_FIELD.TYPE:
        filterCtx.setFilters({ ...filterCtx.filters, type: value, breed: null });
        break;
      case FILTER_FIELD.SEX:
        filterCtx.setFilters({ ...filterCtx.filters, sex: value });
        break;
      case FILTER_FIELD.CITY:
        filterCtx.setFilters({ ...filterCtx.filters, city: value });
        break;
      case FILTER_FIELD.STATUS:
        setStatus(value);
        break;
      case FILTER_FIELD.AGE:
        category = ageCategories.find((c) => c.id == value);
        filterCtx.setFilters({
          ...filterCtx.filters,
          age_from: category.ageFrom,
          age_to: category.ageTo,
        });
        break;
      case FILTER_FIELD.WEIGHT:
        category = weightCategories.find((c) => c.id == value);
        filterCtx.setFilters({
          ...filterCtx.filters,
          weight_from: category.weightFrom,
          weight_to: category.weightTo,
        });
        break;
      case FILTER_FIELD.BREED:
        // temp solution, potrzebne rasy zwracane dynamicznie przez serwer
        category = breeds.dogs.find((c) => c.id == value);
        if (category == undefined) category = breeds.cats.find((c) => c.id == value);
        filterCtx.setFilters({ ...filterCtx.filters, breed: category.value });
        break;
      default:
        break;
    }
  }

  //mapping parametrów i GET /animal/read?params
  async function filterAnimals(filters) {
    console.log("Animals custom-filtered");
    var params = new URLSearchParams({ "user-id": userCtx.userData.userId });
    params = filterCtx.toParams(filters, params);
    animalCtx.updateAnimals(userCtx.userData.token, params);
  }

  {
    /*Funkcja pomocnicza, do późniejszego usunięcia*/
  }
  function debugBool2String(b) {
    return b == true ? "true" : "false";
  }

  {
    /*Globalny kontekst listy zwierząt*/
  }
  var animalList = animalCtx.animals;

  return (
    <View>
      {/*widok ekranu*/}
      <ScrollView>
        <View style={styles.container}>
          {/*pasek wyszukiwania*/}
          <View style={styles.searchbar}>
            <Icon
              name="search"
              color="#777"
              size={30}
              style={styles.searchIcon}
            />
            <TextInput
              value={search}
              onChangeText={onChangeSearch}
              returnKeyType="search"
              onSubmitEditing={onSubmit}
              style={styles.input}
              placeholder="Wyszukaj imię lub numer CHIP"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.textElement}>
              Znaleziono: {animalList.length}
            </Text>
            <Ionicons
              name="options"
              size={30}
              color="black"
              onPress={() => openModal()}
            />
          </View>

          {/*Lista zwierzaków*/}
          <View style={styles.cardContainer}>
            {animalList.map((item) => {
              return (
                <View key={item.id}>
                  <AnimalCard
                    animalId={item.id}
                    navigation={navigation}
                    onFavChange={() => { }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/*Okno opcji filtrów*/}
      <Modal visible={modalOpen} style={styles.modal} animationType="slide">
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
          <Collapse
            onToggle={() => {
              if (typeArrow == "down") setTypeArrow("up");
              else setTypeArrow("down");
            }}
          >
            <CollapseHeader style={styles.collapseHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Typ</Text>
              </View>
              <AntDesign name={typeArrow} size={24} />
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>
              <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                numColumns={3}
                keyExtractor={(item) => item.id}
                data={animalTypes}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      setFilterValue(FILTER_FIELD.TYPE, item.value)
                    }
                  >
                    <Label name={item.label} selected={item.value == filterCtx.filters.type} />
                  </TouchableOpacity>
                )}
              />
            </CollapseBody>
          </Collapse>

          {/*Płeć*/}
          <Collapse
            onToggle={() => {
              if (sexArrow == "down") setSexArrow("up");
              else setSexArrow("down");
            }}
          >
            <CollapseHeader style={styles.collapseHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Płeć</Text>
              </View>
              <AntDesign name={sexArrow} size={24} />
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>
              <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                numColumns={2}
                keyExtractor={(item) => item.id}
                data={animalSexes}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setFilterValue(FILTER_FIELD.SEX, item.label)}
                  >
                    <Label name={item.label} selected={item.label == filterCtx.filters.sex} />
                  </TouchableOpacity>
                )}
              />
            </CollapseBody>
          </Collapse>

          {/*Lokalizacja*/}
          <Collapse
            onToggle={() => {
              if (locationArrow == "down") setLocationArrow("up");
              else setLocationArrow("down");
            }}
          >
            <CollapseHeader style={styles.collapseHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Lokalizacja</Text>
              </View>
              <AntDesign name={locationArrow} size={24} />
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>
              <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                numColumns={1}
                keyExtractor={(item) => item.id}
                data={shelters}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      setFilterValue(FILTER_FIELD.CITY, item.value)
                    }
                  >
                    <Label name={item.label} selected={item.value == filterCtx.filters.city} />
                  </TouchableOpacity>
                )}
              />
            </CollapseBody>
          </Collapse>

          {/*Status*/}
          <Collapse
            onToggle={() => {
              if (statusArrow == "down") setStatusArrow("up");
              else setStatusArrow("down");
            }}
          >
            <CollapseHeader style={styles.collapseHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Status</Text>
              </View>
              <AntDesign name={statusArrow} size={24} />
            </CollapseHeader>
            <CollapseBody style={styles.collapseBody}>
              <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                numColumns={2}
                keyExtractor={(item) => item.id}
                data={statuses}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setFilterValue(FILTER_FIELD.STATUS, item.id)}
                  >
                    {item.id == "1" && filterCtx.filters.urgent &&
                      <Label name={item.label} selected={true} />
                    }
                    {item.id == "1" && !filterCtx.filters.urgent &&
                      <Label name={item.label} selected={false} />
                    }
                    {item.id == "2" && filterCtx.filters.adoptable &&
                      <Label name={item.label} selected={true} />
                    }
                    {item.id == "2" && !filterCtx.filters.adoptable &&
                      <Label name={item.label} selected={false} />
                    }
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
              contentContainerStyle={{ paddingHorizontal: 20, marginLeft: 10 }}
              keyExtractor={(item) => item.id}
              data={ageCategories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setFilterValue(FILTER_FIELD.AGE, item.id)}
                >
                  <Label name={item.label} selected={ageCategories.find((c) => c.id == item.id).ageFrom == filterCtx.filters.age_from} />
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
              contentContainerStyle={{ paddingHorizontal: 20, marginLeft: 10 }}
              keyExtractor={(item) => item.id}
              data={weightCategories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setFilterValue(FILTER_FIELD.WEIGHT, item.id)}
                >
                  <Label name={item.label} selected={filterCtx.filters.weight_from == weightCategories.find((c) => c.id == item.id).weightFrom} />
                </TouchableOpacity>
              )}
            />
          </View>

          {/*Rasa*/}
          {(filterCtx.filters.type === "pies" || filterCtx.filters.type == "kot") && (
            <Collapse
              onToggle={() => {
                if (raceArrow == "down") setRaceArrow("up");
                else setRaceArrow("down");
              }}
            >
              <CollapseHeader style={styles.collapseHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.headerTitle}>W typie rasy</Text>
                </View>
                <AntDesign name={raceArrow} size={24} />
              </CollapseHeader>
              <CollapseBody style={styles.collapseBody}>
                <View style={styles.raceCategoriesContainer}>
                  <FlatList
                    contentContainerStyle={{
                      alignItems: "center",
                    }}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    data={filterCtx.filters.type === "pies" ? breeds.dogs : breeds.cats}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          setFilterValue(FILTER_FIELD.BREED, item.id)
                        }
                      >
                        <AlignedLabel name={item.label} selected={item.value == filterCtx.filters.breed} />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </CollapseBody>
            </Collapse>
          )}
          {/*Pokaż wyniki*/}
          <TouchableOpacity
            onPress={() => {
              filterAnimals(filterCtx.filters);
              setModalOpen("false");
            }}
          >
            <View style={styles.showResultsButton}>
              <Text style={{ color: "white", textAlign: "center" }}>
                Pokaż wyniki
              </Text>
            </View>
          </TouchableOpacity>

          {/*Testy stanu*/}
          <View>
            <Text style={{ fontWeight: "bold" }}>Debug</Text>
            <Text>Typ: {filterCtx.filters.type}</Text>
            <Text>Płeć: {filterCtx.filters.sex}</Text>
            <Text>Lokalizacja: {filterCtx.filters.city}</Text>
            <Text>
              Wiek: {filterCtx.filters.age_from}-{filterCtx.filters.age_to}
            </Text>
            <Text>
              Waga: {filterCtx.filters.weight_from}-
              {filterCtx.filters.weight_to}
            </Text>
            <Text>Rasa: {filterCtx.filters.breed}</Text>
            <Text>
              Status pilne: {debugBool2String(filterCtx.filters.urgent)}
            </Text>
            <Text>
              Status do adopcji: {debugBool2String(filterCtx.filters.adoptable)}
            </Text>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default SeeMoreScreen;

const Label = ({ name, selected = false }) => {
  if (selected) {
    return (
      <View style={[styles.label, styles.selected]}>
        <Text style={{ textAlign: "center", color: "#ccc" }}>{name}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.label}>
        <Text style={{ textAlign: "center", color: "#222" }}>{name}</Text>
      </View>
    );
  }
};

const AlignedLabel = ({ name, selected = false }) => {
  if (selected) {
    return (
      <View style={[styles.alignedLabel, styles.selected]}>
        <Text style={{ textAlign: "center", color: "#ccc" }}>{name}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.alignedLabel}>
        <Text style={{ textAlign: "center", color: "#222" }}>{name}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "#444",
  },
  container: {
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  searchIcon: {
    paddingLeft: 8,
    paddingTop: 6,
    paddingBottom: 3,
    fontWeight: "bold",
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    borderWidth: 1.7,
    borderColor: "#555",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  icon: {
    flex: 1,
    marginHorizontal: 3,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  textElement: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
  },
  cardContainer: {
    alignItems: "center",
  },
  modal: {
    marginTop: "2%",
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c4c4c4",
    paddingVertical: 10,
  },
  closeIcon: {
    marginLeft: 10,
  },
  modalTitle: {
    flex: 1,
    marginLeft: 30,
    fontSize: 18,
  },
  clearFilters: {
    marginRight: 10,
    fontWeight: "bold",
  },
  collapseHeader: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: "gray",
    borderStyle: "solid",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  label: {
    marginLeft: 15,
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: "#c4c4c4",
    borderRadius: 10,
  },
  collapseBody: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  standardHeader: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  alignedLabel: {
    flex: 1,
    width: 100,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#c4c4c4",
    borderRadius: 10,
    justifyContent: "center",
  },
  raceCategoriesContainer: {
    flex: 1,
  },
  showResultsButton: {
    padding: 30,
    backgroundColor: "#362893",
  },
});
