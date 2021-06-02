import React, { useState } from 'react';
import {
  View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { Feather } from '@expo/vector-icons';

const marginLeftText = '5%';
const marginBottomText = 5;

const RegistrationScreen = ({ navigation }) => {

  const errorTrue = "Pole nie może być puste";
  const errorPasswordCombine = "min. 8 znaków • wielka litera • mała litera • cyfra • znak specjalny";
  const notEqualPasswordText = "Hasła nie są takie same. Spróbuj ponownie."
  const notEmail = "Niepoprawny adres e-mail";
  let error = false;

  const [registrationError, setRegistrationError] = useState({

    invalidShelterName: false,
    invalidNIP: false,
    invalidPhoneNumber: false,
    invalidEmail: false,
    invalidStreet: false,
    invalidPostalCode: false,
    invalidTown: false,
    invalidPassword: false,
    invalidPasswordConfirmation: false,
    isEmail: true,
    EqualPassword: true
  });

  const [data, setData] = useState({
    shelterName: '',
    NIP: '',
    phoneNumber: '',
    email: '',
    street: '',
    postalCode: '',
    town: '',
    password: '',
    check_textInputChange: false,
    passwordEye: true,
    passwordConfirmationEye: true
  });

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

  const handlePhoneNumberChange = (val) => {
    setData({
      ...data,
      phoneNumber: val
    });
    setRegistrationError({
      ...registrationError,
      invalidPhoneNumber: false,
    });
    error = false;
  }

  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val
    });
    setRegistrationError((prevState) => {
      return {
        ...prevState,
        invalidEmail: false,
      }
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
        <Text style={styles.inputTitle}>Imię</Text>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={[styles.textInput, registrationError.invalidShelterName ? styles.inputError : null]}
          onChangeText={(val) => handleShetlerNameChange(val)}
        />
        {registrationError.invalidShelterName && <Text style={[styles.error]}>{errorTrue}</Text>}

        <View>
          <Text style={styles.inputTitle}>Numer chip (opcjonalne)</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidNIP ? styles.inputError : null]}
            onChangeText={(val) => handleNIPChange(val)}
          />
          {registrationError.invalidNIP && <Text style={[styles.error]}>{errorTrue}</Text>}
        </View>

        <View>
          <Text style={styles.inputTitle}>Data przyjęcia (DD-MM-YYYY)</Text>
          <TextInput
            placeholderTextColor="#000"
            placeholderStyle={{}}
            style={[styles.textInput, registrationError.invalidPhoneNumber ? styles.inputError : null]}
            autoCapitalize="none"
            onChangeText={(val) => handlePhoneNumberChange(val)}
          />
          {registrationError.invalidPhoneNumber && <Text style={[styles.error]}>{errorTrue}</Text>}
        </View>

        <View>
          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <View style={styles.collapse}>
                  <Text>Typ</Text>
                  <Feather
                    name="chevron-down"
                    color="black"
                    size={20}
                    style={{ marginTop: 3 }}
                  />
                </View>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem >
                <Text>Aaron Bennet</Text>
              </ListItem>
              <ListItem>
                <Text>Claire Barclay</Text>
              </ListItem>
              <ListItem last>
                <Text>Kelso Brittany</Text>
              </ListItem>
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <Separator bordered>
                <Text>FORWARD</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              <ListItem >
                <Text>Aaron Bennet</Text>
              </ListItem>
              <ListItem>
                <Text>Claire Barclay</Text>
              </ListItem>
              <ListItem last>
                <Text>Kelso Brittany</Text>
              </ListItem>
            </CollapseBody>
          </Collapse>
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
  }
});
