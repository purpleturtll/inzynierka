import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import styles from "../components/create_profile_components/styles";
import { Feather } from "@expo/vector-icons";
import Name from "../components/create_profile_components/Name/Name";
import Chip from "../components/create_profile_components/Chip/Chip";
import AnimalType from "../components/create_profile_components/AnimalType/AnimalType";
import AnimalSex from "../components/create_profile_components/Sex/Sex";
import Status from "../components/create_profile_components/Status/Status";
import Age from "../components/create_profile_components/Age/Age";
import Weight from "../components/create_profile_components/Weight/Weight";
import DateX from "../components/create_profile_components/DateX/DateX";
import Description from "../components/create_profile_components/Description/Description";
import VaccinatedSwitch from "../components/create_profile_components/VaccinatedSwitch/VaccinatedSwitch";
import SterilizedSwitch from "../components/create_profile_components/SterilizedSwitch/SterilizedSwitch";
import PickImage from "../components/create_profile_components/PickImage/PickImage";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
const apiUrl = Constants.manifest.extra.apiUrl;
const CreateAnimalProfileScreen = ({ navigation }) => {
  const errorTrue = "Pole nie może być puste";
  const wrongCHIPFormat = "Numer chip powinien zawierać 15 cyfr";
  const unselected = "Wybierz jedną z opcji";
  const unselectedStatus = "Wybierz co najmniej jedną z opcji";
  let error = false;

  const [createProfileError, setCreateProfileError] = useState({
    invalidName: false,
    invalidCHIP: false,
    invalidDescription: false,
    unselectedAnimalType: false,
    unselectedSex: false,
    unselectedStatus: false,
    emptyAge: false,
    emptyWeight: false,
    invalidWeight: false,
    wrongDateFormat: false,
    wrongCHIPFormat: false,
  });

  const [filters, setFilters] = useState({
    type: null,
    sex: null,
    status: null,
    location: null,
    age: null,
    weight: null,
    race: null,
  });

  const [animalTypeFilter, setAnimalTypeFilter] = useState(null);
  const [sexFilter, setSexFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState([]);
  const [breedFilter, setBreedFilter] = useState(null);
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isSterilized, setIsSterilized] = useState(false);

  function setFilterValue(fieldName, value) {
    switch (fieldName) {
      case "type":
        setFilters({ ...filters, type: value });
        break;
      case "status":
        setFilters({ ...filters, status: value });
      case "sex":
        setFilters({ ...filters, sex: value });
        break;
      case "race":
        setFilters({ ...filters, race: value });
        break;
      default:
        break;
    }
  }

  {
    /*Typy zwierząt*/
  }
  const animalTypes = [
    { id: "0", label: "pies" },
    { id: "1", label: "kot" },
    { id: "2", label: "gryzoń" },
    { id: "3", label: "gad" },
    { id: "4", label: "ptak" },
    { id: "5", label: "królik" },
    { id: "6", label: "inne" },
  ];

  {
    /*Statusy zwierząt*/
  }
  const animalStatus = [
    { id: "0", label: "do adopcji" },
    { id: "1", label: "dom tymczasowy" },
    { id: "2", label: "pilne" },
    { id: "3", label: "kwarantanna" },
  ];

  {
    /*Płci zwierząt*/
  }
  const animalSexes = [
    { id: "0", label: "samica" },
    { id: "1", label: "samiec" },
  ];

  const catRaces = [
    { id: "0", label: "Europejska" },
    { id: "1", label: "Syryjska" },
  ];

  const dogRaces = [
    { id: "01", label: "Amstaff/Pitbull" },
    { id: "02", label: "Bernardyn" },
    { id: "03", label: "Cocker spaniel" },
    { id: "04", label: "Foksterier" },
    { id: "05", label: "Husky" },
    { id: "06", label: "Jamnik" },
    { id: "07", label: "Labrador" },
    { id: "08", label: "Mieszaniec" },
    { id: "09", label: "Owczarek\nkaukaski" },
    { id: "10", label: "Owczarek\nniemiecki" },
    { id: "11", label: "Owczarek\npodhalański" },
    { id: "12", label: "Sznaucer" },
    { id: "13", label: "Terier" },
    { id: "14", label: "Inne" },
  ];

  const [data, setData] = useState({
    animal_type: "",
    breed: "",
    name: "",
    shelterName: "",
    CHIP: "",
    years: "",
    months: "",
    kg: "",
    g: "",
    description: "",
    date: "",
    isSterilized: false,
    isVaccinated: false,
    sex: "",
    check_textInputChange: false,
  });

  const [image, setImage] = useState(null);

  // ustawienie ikony strzałki typu
  const [iconName, setIconName] = useState("chevron-down");
  const [breedNameIcon, setBreedNameIcon] = useState("chevron-down");

  const handleNameChange = (val) => {
    setData({
      ...data,
      name: val,
    });
    setCreateProfileError({
      ...createProfileError,
      invalidName: false,
    });
    error = false;
  };

  const handleCHIPChange = (val) => {
    setData({
      ...data,
      CHIP: val,
    });
    setCreateProfileError({
      ...createProfileError,
      invalidCHIP: false,
    });
    error = false;
  };

  const handleDateChange = (val) => {
    setData({
      ...data,
      date: val,
    });
    setCreateProfileError({
      ...createProfileError,
      invalidDate: false,
    });
    error = false;
  };

  // Age ------------------

  function AgeToMonths() {
    let tempAge = parseInt(data.years) * 12 + parseInt(data.months);
    return tempAge;
  }

  const handleYearsChange = (val) => {
    setData({
      ...data,
      years: val,
    });
  };

  const handleMonthsChange = (val) => {
    setData({
      ...data,
      months: val,
    });
  };

  //Weight --------------

  const handleKgChange = (val) => {
    setData({
      ...data,
      kg: val,
    });
  };

  const handleGramChange = (val) => {
    setData({
      ...data,
      g: val,
    });
  };

  function WeightToGram() {
    let tempWeight = parseInt(data.kg) * 1000 + parseInt(data.g);
    return tempWeight;
  }

  const handleAnimalTypeChange = (val) => {
    setData({
      ...data,
      animal_type: val,
    });
    setCreateProfileError({
      ...createProfileError,
      unselectedAnimalType: false,
    });
    error = false;

    setFilterValue("type", val);
    setAnimalTypeFilter(val);
    setBreedFilter(undefined);
  };

  const handleSexChange = (val) => {
    setData({
      ...data,
      sex: val,
    });
    setCreateProfileError({
      ...createProfileError,
      unselectedSex: false,
    });
    error = false;

    setFilterValue("sex", val);
    setSexFilter(val);
  };

  const handleStatusChange = (val) => {
    setCreateProfileError({
      ...createProfileError,
      unselectedStatus: false,
    });
    error = false;

    setFilterValue("status", val);
    selectionMultiple(val);
  };

  const handleDescriptionChange = (val) => {
    setData({
      ...data,
      description: val,
    });
    setCreateProfileError({
      ...createProfileError,
      invalidDescription: false,
    });
    error = false;
  };

  const selectionMultiple = (id) => {
    let selectedIds = [...statusFilter];

    if (selectedIds.includes(id))
      selectedIds = selectedIds.filter((_id) => _id !== id);
    else selectedIds.push(id);

    setStatusFilter(selectedIds);
  };

  const checkDate = (date) => {
    return /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/.test(
      date
    );
  };

  const onRegisterPress = () => {
    //funkcje z return do fetch
    AgeToMonths();
    WeightToGram();

    setData({
      ...data,
      isVaccinated: isVaccinated,
      isSterilized: isSterilized,
    });

    if (data.name == "") {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          invalidName: true,
        };
      });
      error = true;
    }

    if (data.CHIP.length > 0 && data.CHIP.length < 15) {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          wrongCHIPFormat: true,
        };
      });
      error = true;
    } else {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          wrongCHIPFormat: false,
          invalidCHIP: false,
        };
      });
      error = false;
    }

    if (data.date.length > 0 && !checkDate(data.date)) {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          wrongDateFormat: true,
        };
      });
      error = true;
    } else if (data.date == "") {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          invalidDate: true,
          wrongDateFormat: false,
        };
      });
      error = true;
    } else {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          wrongDateFormat: false,
          invalidDate: false,
        };
      });
      error = false;
    }

    if (animalTypeFilter == null) {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          unselectedAnimalType: true,
        };
      });
      error = true;
    }

    if (statusFilter == []) {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          unselectedStatus: true,
        };
      });
      error = true;
    }

    if (sexFilter == null) {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          unselectedSex: true,
        };
      });
      error = true;
    }

    if (statusFilter.length == 0) {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          unselectedStatus: true,
        };
      });
      error = true;
    }

    if (data.years == "" && data.months == "") {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          emptyAge: true,
        };
      });
      error = true;
    } else {
      setCreateProfileError({
        ...createProfileError,
        emptyAge: false,
      });
      error = false;
    }

    if (data.kg == "" && data.g == "") {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          emptyWeight: true,
        };
      });
      error = true;
    } else {
      setCreateProfileError({
        ...createProfileError,
        emptyWeight: false,
      });
      error = false;
    }

    if (data.description == "") {
      setCreateProfileError((prevState) => {
        return {
          ...prevState,
          invalidDescription: true,
        };
      });
      error = true;
    }

    if (error) {
      return;
    }

    FileSystem.uploadAsync(`${apiUrl}/animal/create`, image, {
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "file",
      parameters: {
        doc: JSON.stringify({
          AnimalType: data.animal_type,
          Breed: data.breed,
          Name: data.name,
          ShelterName: data.shelterName,
          ChipNumber: data.CHIP,
          Years: data.years,
          Months: data.months,
          Kg: data.kg,
          G: data.g,
          Description: data.description,
          AdmissionDate: data.date,
          Sex: data.sex,
        }),
      },
    })
      .then((response) => {
        if (response.status == 201) {
          navigation.navigate("CreatedAnimalProfileScreen");
        } else {
          //navigation.navigate("CreateAnimalProfileScreen");
        }
      })
      .catch((error) => {
        console.log(error, image);
      });
  };

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Dodaj ogłoszenie</Text>
        <Text style={[styles.marginsText, styles.headerTitle]}>Imię</Text>
        <Name
          changeName={handleNameChange}
          profileError={createProfileError}
          errorTrue={errorTrue}
        />

        <Chip
          changeChip={handleCHIPChange}
          profileError={createProfileError}
          wrongCHIPFormat={wrongCHIPFormat}
        />

        <DateX handleDateChange={handleDateChange} />

        <View>
          {/* collapse typ */}
          <Collapse
            onToggle={() => {
              if (iconName == "chevron-down") {
                setIconName("chevron-up");
              }
              if (iconName == "chevron-up") {
                setIconName("chevron-down");
              }
            }}
          >
            <CollapseHeader>
              <View style={[styles.marginsText, styles.collapse]}>
                <Text style={styles.headerTitle}>Typ</Text>
                <Feather
                  name={iconName}
                  color="black"
                  size={22}
                  style={{ marginTop: 3 }}
                />
              </View>
            </CollapseHeader>
            <CollapseBody>
              {/*Typ zwierzęcia*/}
              <AnimalType
                changeAnimalType={handleAnimalTypeChange}
                profileError={createProfileError}
                animalTypes={animalTypes}
                animalTypeFilter={animalTypeFilter}
                unselected={unselected}
              />

              {/*Płeć*/}
              <AnimalSex
                changeAnimalSex={handleSexChange}
                profileError={createProfileError}
                animalSexes={animalSexes}
                animalSexFilter={sexFilter}
                unselected={unselected}
              />

              {/*Statusy*/}
              <Status
                changeStatus={handleStatusChange}
                profileError={createProfileError}
                animalStatus={animalStatus}
                animalStatusFilter={statusFilter}
                unselectedStatus={unselectedStatus}
              />

              <VaccinatedSwitch
                isVaccinated={isVaccinated}
                setIsVaccinated={setIsVaccinated}
              />

              <SterilizedSwitch
                isSterilized={isSterilized}
                setIsSterilized={setIsSterilized}
              />

              {/*Wiek*/}

              <Age
                handleYearsChange={handleYearsChange}
                handleMonthsChange={handleMonthsChange}
                years={data.years}
                months={data.months}
                errorTrue={errorTrue}
                createProfileError={createProfileError}
              />

              {/*Waga*/}
              <Weight
                handleKgChange={handleKgChange}
                handleGramChange={handleGramChange}
                kg={data.kg}
                g={data.g}
                errorTrue={errorTrue}
                createProfileError={createProfileError}
              />
            </CollapseBody>
          </Collapse>

          {/* collapse rasa */}
          {(animalTypeFilter == null ||
            animalTypeFilter == "1" ||
            animalTypeFilter == "2") && (
            <Collapse
              onToggle={() => {
                if (breedNameIcon == "chevron-down") {
                  setBreedNameIcon("chevron-up");
                }
                if (breedNameIcon == "chevron-up") {
                  setBreedNameIcon("chevron-down");
                }
              }}
            >
              <CollapseHeader>
                <View style={[styles.marginsText, styles.collapse]}>
                  <Text style={styles.headerTitle}>W typie rasy</Text>
                  <Feather
                    name={breedNameIcon}
                    color="black"
                    size={22}
                    style={{ marginTop: 3 }}
                  />
                </View>
              </CollapseHeader>
              <CollapseBody>
                {(animalTypeFilter == "1" || animalTypeFilter == null) && (
                  <View
                    style={[styles.marginsText, styles.raceCategoriesContainer]}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      Pies
                    </Text>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <FlatList
                        contentContainerStyle={{ alignItems: "center" }}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        data={dogRaces}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setFilterValue("race", item.id);
                              setBreedFilter(item.id);
                            }}
                          >
                            <AlignedLabel item={item} selected={breedFilter} />
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                )}

                {animalTypeFilter == "2" && (
                  <View
                    style={[styles.marginsText, styles.raceCategoriesContainer]}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      Kot
                    </Text>
                    <FlatList
                      contentContainerStyle={{ alignItems: "center" }}
                      numColumns={2}
                      keyExtractor={(item) => item.id}
                      data={catRaces}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setFilterValue("race", item.id);
                            setBreedFilter(item.id);
                          }}
                        >
                          <AlignedLabel item={item} selected={breedFilter} />
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
              </CollapseBody>
            </Collapse>
          )}
        </View>

        <PickImage _pickImage={_pickImage} image={image} />

        <Description
          handleDescriptionChange={handleDescriptionChange}
          createProfileError={createProfileError}
          errorTrue={errorTrue}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={onRegisterPress}>
            <Text style={{ color: "#fff" }}>Dodaj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default CreateAnimalProfileScreen;

const Label = ({ item, selected }) => {
  return (
    <View style={[styles.label, selected === item.id ? styles.selected : null]}>
      <Text style={{ textAlign: "center" }}>{item.label}</Text>
    </View>
  );
};

const LabelStatus = ({ item, selected }) => {
  return (
    <View
      style={[
        styles.label,
        selected.includes(item.id) ? styles.selected : null,
      ]}
    >
      <Text style={{ textAlign: "center" }}>{item.label}</Text>
    </View>
  );
};

const AlignedLabel = ({ item, selected }) => {
  return (
    <View
      style={[
        styles.alignedLabel,
        selected === item.id ? styles.selected : null,
      ]}
    >
      <Text style={{ textAlign: "center" }}>{item.label}</Text>
    </View>
  );
};
