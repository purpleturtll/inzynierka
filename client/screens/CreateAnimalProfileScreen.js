import React, { useState } from 'react';
import {
  View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator, Input } from 'native-base';
import { Feather } from '@expo/vector-icons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const marginLeftText = '5%';
const marginBottomText = 10;

const RegistrationScreen = ({ navigation }) => {

  const errorTrue = "Pole nie może być puste";
  const errorPasswordCombine = "min. 8 znaków • wielka litera • mała litera • cyfra • znak specjalny";
  const notEqualPasswordText = "Hasła nie są takie same. Spróbuj ponownie."
  const notEmail = "Niepoprawny adres e-mail";
  let error = false;

  const [registrationError, setRegistrationError] = useState({

    invalidShelterName: false,
    invalidNIP: false,
    invalidWeight: false,
    invalidEmail: false,
    invalidAge: false,
    invalidPostalCode: false,
    invalidTown: false,
    invalidPassword: false,
    invalidPasswordConfirmation: false,
    isEmail: true,
    EqualPassword: true
  });


  const [filters, setFilters] = useState({
    type: null,
    sex: null,
    status: null,
    location: null,
    age: null,
    weight: null,
    race: null
  });


  function setFilterValue(fieldName, value) {
    switch(fieldName)
    {
      case 'type':
        setFilters({...filters, type: value});
        break;
      case 'status':
        setFilters({...filters, status: value});
      case 'sex':
        setFilters({...filters, sex: value});
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

  {/*Statusy zwierząt*/}
  const animalStatus = [
    {id: '1', label: 'do adopcji'},
    {id: '2', label: 'dom tymczasowy'},
    {id: '3', label: 'pilne'},
    {id: '4', label: 'kwarantanna'},
  ];

  {/*Płci zwierząt*/}
  const animalSexes = [
    {id: '1', label: 'samica'},
    {id: '2', label: 'samiec'}
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

  const [animalType, setAnimalType] = useState(1);

  // radio wiek
  var radio_age_props = [
    {label: 'lat', value: 0 },
    {label: 'mies', value: 1 }
  ];

  // radio waga
  var radio_weight_props = [
    {label: 'g', value: 0 },
    {label: 'kg', value: 1 }
  ];
  
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);


  const [data, setData] = useState({
    shelterName: '',
    NIP: '',
    weight: '',
    age: '',
    street: '',
    postalCode: '',
    town: '',
    password: '',
    check_textInputChange: false,
    passwordEye: true,
    passwordConfirmationEye: true
  });


  // ustawienie ikony strzałki typu
  const [iconName, setIconName] = useState("chevron-down");
  const [breedNameIcon, setBreedNameIcon] = useState("chevron-down");


  const handleShetlerNameChange = (val) => {
    setData({
      ...data,
      shelterName: val
    });
    setRegistrationError({
      ...registrationError,
      invalidShelterName: false,
    });
    error = false;
  }

  const handleNIPChange = (val) => {
    setData({
      ...data,
      NIP: val
    });
    setRegistrationError({
      ...registrationError,
      invalidNIP: false,
    });
    error = false;
  }

  const handleAgeChange = (val) => {
    setData({
      ...data,
      age: val
    });
    setRegistrationError({
      ...registrationError,
      invalidAge: false,
    });
    error = false;
  }

  const handleWeightChange = (val) => {
    setData({
      ...data,
      weight: val
    });
    setRegistrationError({
      ...registrationError,
      invalidWeight: false,
    });
    error = false;
  }

  const validateIsEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  const handleStreetChange = (val) => {
    setData({
      ...data,
      street: val
    });
    setRegistrationError({
      ...registrationError,
      invalidStreet: false,
    });
    error = false;
  }

  const handlePostalCodeChange = (val) => {
    setData({
      ...data,
      postalCode: val
    });
    setRegistrationError({
      ...registrationError,
      invalidPostalCode: false,
    });
    error = false;
  }

  const handleTownChange = (val) => {
    setData({
      ...data,
      town: val
    });
    setRegistrationError({
      ...registrationError,
      invalidTown: false,
    });
    error = false;
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
    setRegistrationError({
      ...registrationError,
      invalidPassword: false,
    });
    error = false;
  }

  const handlePasswordConfirmationChange = (val) => {
    setData({
      ...data,
      passwordConfirmation: val
    });

    setRegistrationError((prevState) => {
      return {
        ...prevState,
        invalidPasswordConfirmation: false,
        EqualPassword: true
      }
    });
    error = false;
  }

  const updatePasswordEye = () => {
    setData({
      ...data,
      passwordEye: !data.passwordEye
    })
  }

  const updatePasswordConfirmationEye = () => {
    setData({
      ...data,
      passwordConfirmationEye: !data.passwordConfirmationEye
    })
  }

  const checkPassword = (password) => {
    let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return reg.test(password);
  }

  const ifEqualPassword = () => {
    if (data.password === data.passwordConfirmation) {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          EqualPassword: true
        }
      });
    } else {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          EqualPassword: false,
        }
      });
      error = true;
    }
  }

  const onRegisterPress = () => {

    if (data.shelterName == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidShelterName: true,
        };
      });
      error = true;
    }
    if (data.NIP == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidNIP: true,
        };
      });
      error = true;
    }

    if (data.phoneNumber == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidPhoneNumber: true,
        };
      });
      error = true;
    }

    if (data.email.length > 0 && !validateIsEmail(data.email)) {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          isEmail: false,
        };
      });
      error = true;
    }
    else if (data.email == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidEmail: true,
        };
      });
      error = true;
    }

    if (data.street == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidStreet: true,
        };
      });
      error = true;
    }

    if (data.postalCode == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidPostalCode: true,
        };
      });
      error = true;
    }

    if (data.town == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidTown: true,
        };
      });
      error = true;
    }

    if (data.password == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidPassword: true,
        };
      });
      error = true;
    }
    if (data.passwordConfirmation == "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidPasswordConfirmation: true,
        };
      });
      error = true;
    }

    if (checkPassword(data.password)) {
      ifEqualPassword()
    } else {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          invalidPassword: true,
          invalidPasswordConfirmation: true,
        };
      });
      error = true;
    }

    if (error) {
      return
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Dodaj ogłoszenie</Text>
        <Text style={[styles.marginsText, styles.headerTitle]}>Imię</Text>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={[styles.textInput, registrationError.invalidShelterName ? styles.inputError : null]}
          onChangeText={(val) => handleShetlerNameChange(val)}
        />
        {registrationError.invalidShelterName && <Text style={[styles.error]}>{errorTrue}</Text>}

        <View>
          <Text style={[styles.marginsText, styles.headerTitle]}>Numer chip (opcjonalne)</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidNIP ? styles.inputError : null]}
            onChangeText={(val) => handleNIPChange(val)}
          />
          {registrationError.invalidNIP && <Text style={[styles.error]}>{errorTrue}</Text>}
        </View>

        <View>
          <Text style={[styles.marginsText, styles.headerTitle]}>Data przyjęcia (DD-MM-YYYY)</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidPhoneNumber ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handleWeightChange(val)}
          />
          {registrationError.invalidPhoneNumber && <Text style={[styles.error]}>{errorTrue}</Text>}
        </View>

        <View>
        {/* collapse typ */}
          <Collapse onToggle={()=> {
            if(iconName == "chevron-down"){
              setIconName("chevron-up")
            }
            if(iconName == "chevron-up"){
              setIconName("chevron-down")
            }
          }}>
            <CollapseHeader>
                <View style={styles.collapse}>
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

 {/*gatunek*/}
 <View>
          <View style={styles.standardHeader}>
            <Text style={styles.headerTitle}>Typ</Text>
          </View>
          <FlatList 
            numColumns={4}
            contentContainerStyle={
              {paddingHorizontal: 20}}
            keyExtractor={(item) => item.id }
            data={animalTypes}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => {
                setFilterValue('type', item.id); 
                setAnimalType(item.id)
                }}>
                <Label name={item.label}/>
              </TouchableOpacity>
            )}
          />
        </View>


        {/*Płeć*/}
        <View>
          <View style={styles.standardHeader}>
            <Text style={styles.headerTitle}>Płeć</Text>
          </View>
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20}}
            keyExtractor={(item) => item.id }
            data={animalSexes}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setFilterValue('sex', item.id)}>
                <Label name={item.label}/>
              </TouchableOpacity>
            )}
          />
        </View>

        {/*Statusy*/}
        <View>
          <View style={styles.standardHeader}>
            <Text style={styles.headerTitle}>Status (wielokrotny wybór)</Text>
          </View>
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 20}}
            keyExtractor={(item) => item.id }
            data={animalStatus}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setFilterValue('status', item.id)}>
                <Label name={item.label}/>
              </TouchableOpacity>
            )}
          />
        </View>

        {/*Wiek*/}
        <View>
          <View style={styles.standardHeader}>
            <Text style={styles.headerTitle}>Wiek</Text>
          <RadioForm
            radio_props={radio_age_props}
            initial={0}
            formHorizontal={true}
            buttonColor={'#362893'}
            selectedButtonColor={'#362893'}
            borderWidth={1}
            buttonSize={15}
            style={{marginLeft: 20}}
            labelStyle={{marginRight: 15}}
            animation={true}
            onPress={(value) => setAge(value)}
          />
          </View>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, styles.textInputCollapse, registrationError.invalidAge ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handleAgeChange(val)}
          />
        </View>

        {/*Waga*/}
        <View>
          <View style={styles.standardHeader}>
            <Text style={styles.headerTitle}>Waga</Text>
          <RadioForm
            radio_props={radio_weight_props}
            initial={0}
            formHorizontal={true}
            buttonColor={'#362893'}
            selectedButtonColor={'#362893'}
            borderWidth={1}
            buttonSize={15}
            style={{marginLeft: 20}}
            labelStyle={{marginRight: 15}}
            animation={true}
            onPress={(value) => setWeight(value)}
          />
          </View>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, styles.textInputCollapse, registrationError.invalidWeight ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handleWeightChange(val)}
          />
        </View>
        </CollapseBody>
        </Collapse>

          {/* collapse rasa */}
          {(animalType == "1"  || animalType == "2") &&

          <Collapse onToggle={()=> {
            if(breedNameIcon == "chevron-down"){
              setBreedNameIcon("chevron-up")
            }
            if(breedNameIcon == "chevron-up"){
              setBreedNameIcon("chevron-down")
            }
          }}>
            <CollapseHeader>
              <View style={styles.collapse}>
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

            {animalType == "1" &&
              <View style={styles.raceCategoriesContainer}>
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
          }
          {animalType == "2" &&
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
              </View>
            }
        </CollapseBody>
      </Collapse>
          }
      </View>
          

        <View>
          <Text style={styles.inputTitle}>Adres e-mail</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidEmail || !registrationError.isEmail ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handleEmailChange(val)}
          />
          {registrationError.invalidEmail && <Text style={[styles.error]}>{errorTrue}</Text>}
          {!registrationError.isEmail && <Text style={[styles.error]}>Niepoprawny adres e-mail</Text>}
        </View>
        <View>
          <Text style={styles.inputTitle}>Nazwa ulicy i numer budynku</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidStreet ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handleStreetChange(val)}
          />
          {registrationError.invalidStreet && <Text style={[styles.error]}>{errorTrue}</Text>}
        </View>
        <View>
          <Text style={styles.inputTitle}>Kod pocztowy</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidPostalCode ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handlePostalCodeChange(val)}
          />
          {registrationError.invalidPostalCode && <Text style={[styles.error]}>{errorTrue}</Text>}
        </View>
        <View>
          <Text style={styles.inputTitle}>Miejscowość</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidTown ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handleTownChange(val)}
          />
          {registrationError.invalidTown && <Text style={[styles.error]}>{errorTrue}</Text>}
        </View>
        <View>
          <Text style={styles.inputTitle}>Hasło</Text>
          <View style={[styles.passwordContainer, registrationError.invalidPassword ? styles.inputError : null]}>
            <TextInput
              placeholderTextColor="#000"
              secureTextEntry={data.passwordEye ? true : false}
              style={styles.textInput, styles.textInputPass}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updatePasswordEye}>
              {data.passwordEye ?

                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                  style={{ marginTop: 3 }}

                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                  style={{ marginTop: 3 }}

                />
              }
            </TouchableOpacity>
          </View>
          <Text style={[styles.descriptionPassword, registrationError.invalidPassword ? styles.error : null]}>{errorPasswordCombine}</Text>
        </View>
        <View>
          <Text style={styles.inputTitle}>Potwierdź hasło</Text>
          <View style={[styles.passwordContainer, registrationError.invalidPasswordConfirmation || !registrationError.EqualPassword ? styles.inputError : null]}>
            <TextInput
              placeholderTextColor="#000"
              secureTextEntry={data.passwordConfirmationEye ? true : false}
              style={styles.textInput, styles.textInputPass}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordConfirmationChange(val)}
            />
            <TouchableOpacity
              onPress={updatePasswordConfirmationEye}>
              {data.passwordConfirmationEye ?

                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                  style={{ marginTop: 3 }}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                  style={{ marginTop: 3 }}
                />
              }
            </TouchableOpacity>
          </View>
          {!registrationError.EqualPassword && <Text style={[styles.error]}>{notEqualPasswordText}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={onRegisterPress}>
            {/* //() => navigation.navigate('DoneRegistrationScreen') */}
            <Text style={{ color: '#fff' }}>Utwórz konto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={{ color: '#69667C', fontWeight: 'bold', marginVertical: 20 }}>Masz już konto?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
export default RegistrationScreen;

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

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginLeft: '7.5%'
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
    marginBottom: 10,
  },
  textInputCollapse: {
    width: '90%',
    marginLeft: 20,
  },
  inputTitle: {
    marginLeft: marginLeftText,
    marginBottom: marginBottomText,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '900'
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 4
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
    marginBottom: 15
  },
  textInputPass: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  registerButton: {
    flexDirection: 'row',
    height: 50,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#362893',
    borderRadius: 20,
    padding: 10,
  },
  descriptionPassword: {
    marginLeft: marginLeftText,
    color: 'black',
    fontSize: 15,
    marginBottom: 10
  },
  error: {
    marginLeft: marginLeftText,
    color: 'red',
    fontSize: 15,
    marginBottom: 10
  },
  collapse: {
    flexDirection: 'row',
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
  standardHeader: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  marginsText: {
    marginLeft: marginLeftText,
    marginBottom: marginBottomText,
    marginTop: 10,
  },
  label: {
    marginRight: 15,
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
  },
});
