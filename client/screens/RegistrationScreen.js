import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const marginLeftText = "5%";
const marginBottomText = 5;
const RegistrationScreen = ({ navigation }) => {
    const errorTrue = "Pole nie może być puste";
    const errorPasswordCombine =
        "min. 8 znaków • wielka litera • mała litera • cyfra • znak specjalny";
    const notEqualPasswordText = "Hasła nie są takie same. Spróbuj ponownie.";
    let error = false;

    const [registrationError, setRegistrationError] = useState({
        invalidFirstname: false,
        invalidSurname: false,
        invalidEmail: false,
        invalidPassword: false,
        invalidPasswordConfirmation: false,
        isEmail: true,
        EqualPassword: true,
    });

    const [data, setData] = useState({
        firstname: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        check_textInputChange: false,
        passwordEye: true,
        passwordConfirmationEye: true,
    });

    const handleFirstnameChange = (val) => {
        setData({
            ...data,
            firstname: val,
        });
        setRegistrationError({
            ...registrationError,
            invalidFirstname: false,
        });
        error = false;
    };

    const handleSurnameChange = (val) => {
        setData({
            ...data,
            surname: val,
        });
        setRegistrationError({
            ...registrationError,
            invalidSurname: false,
        });
        error = false;
    };

    const handleEmailChange = (val) => {
        setData({
            ...data,
            email: val,
        });
        setRegistrationError((prevState) => {
            return {
                ...prevState,
                invalidEmail: false,
            };
        });
        error = false;
    };

    const validateIsEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
        setRegistrationError({
            ...registrationError,
            invalidPassword: false,
        });
        error = false;
    };

    const handlePasswordConfirmationChange = (val) => {
        setData({
            ...data,
            passwordConfirmation: val,
        });

        setRegistrationError((prevState) => {
            return {
                ...prevState,
                invalidPasswordConfirmation: false,
                EqualPassword: true,
            };
        });
        error = false;
    };

    const updatePasswordEye = () => {
        setData({
            ...data,
            passwordEye: !data.passwordEye,
        });
    };

    const updatePasswordConfirmationEye = () => {
        setData({
            ...data,
            passwordConfirmationEye: !data.passwordConfirmationEye,
        });
    };

    const checkPassword = (password) => {
        let reg = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        return reg.test(password);
    };

    const ifEqualPassword = () => {
        if (data.password === data.passwordConfirmation) {
            setRegistrationError((prevState) => {
                return {
                    ...prevState,
                    EqualPassword: true,
                };
            });
        } else {
            setRegistrationError((prevState) => {
                return {
                    ...prevState,
                    EqualPassword: false,
                };
            });
            error = true;
        }
    };

    const onRegisterPress = () => {
        if (data.firstname == "") {
            setRegistrationError((prevState) => {
                return {
                    ...prevState,
                    invalidFirstname: true,
                };
            });
            error = true;
        }

        if (data.surname == "") {
            setRegistrationError((prevState) => {
                return {
                    ...prevState,
                    invalidSurname: true,
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
        } else if (data.email == "") {
            setRegistrationError((prevState) => {
                return {
                    ...prevState,
                    invalidEmail: true,
                };
            });
            error = true;
        } else if (validateIsEmail(data.email)) {
            setRegistrationError((prevState) => {
                return {
                    ...prevState,
                    isEmail: true,
                    invalidEmail: false,
                };
            });
            error = false;
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
            ifEqualPassword();
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
            return;
        }

        const res = fetch("http://10.0.2.2:8080/auth/register", {
            body: JSON.stringify({
                firstname: data.firstname,
                surname: data.surname,
                email: data.email,
                password: data.password,
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        }).then((response) => {
            if (response.status == 201) {
                navigation.navigate("DoneRegistrationScreen");
            } else {
                navigation.navigate("RegistrationScreen");
            }
        });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Rejestracja</Text>
                <Text style={styles.inputTitle}>Imię</Text>
                <TextInput
                    placeholderTextColor="#000"
                    placeholderStyle={{}}
                    style={[
                        styles.textInput,
                        registrationError.invalidFirstname
                            ? styles.inputError
                            : null,
                    ]}
                    onChangeText={(val) => handleFirstnameChange(val)}
                />
                {registrationError.invalidFirstname && (
                    <Text style={[styles.error]}>{errorTrue}</Text>
                )}

                <View>
                    <Text style={styles.inputTitle}>Nazwisko</Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={[
                            styles.textInput,
                            registrationError.invalidSurname
                                ? styles.inputError
                                : null,
                        ]}
                        onChangeText={(val) => handleSurnameChange(val)}
                    />
                    {registrationError.invalidSurname && (
                        <Text style={[styles.error]}>{errorTrue}</Text>
                    )}
                </View>

                <View>
                    <Text style={styles.inputTitle}>Adres e-mail</Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={[
                            styles.textInput,
                            registrationError.invalidEmail
                                ? styles.inputError
                                : null,
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => handleEmailChange(val)}
                    />
                    {registrationError.invalidEmail && (
                        <Text style={[styles.error]}>{errorTrue}</Text>
                    )}
                    {!registrationError.isEmail && (
                        <Text style={[styles.error]}>
                            Niepoprawny adres e-mail
                        </Text>
                    )}
                </View>
                <View>
                    <Text style={styles.inputTitle}>Hasło</Text>
                    <View
                        style={[
                            styles.passwordContainer,
                            registrationError.invalidPassword
                                ? styles.inputError
                                : null,
                        ]}
                    >
                        <TextInput
                            placeholderTextColor="#000"
                            secureTextEntry={data.passwordEye ? true : false}
                            style={(styles.textInput, styles.textInputPass)}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity onPress={updatePasswordEye}>
                            {data.passwordEye ? (
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                    style={{ marginTop: 3 }}
                                />
                            ) : (
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                    style={{ marginTop: 3 }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={[
                            styles.descriptionPassword,
                            registrationError.invalidPassword
                                ? styles.error
                                : null,
                        ]}
                    >
                        {errorPasswordCombine}
                    </Text>
                </View>
                <View>
                    <Text style={styles.inputTitle}>Potwierdź hasło</Text>
                    <View
                        style={[
                            styles.passwordContainer,
                            registrationError.invalidPasswordConfirmation ||
                            !registrationError.EqualPassword
                                ? styles.inputError
                                : null,
                        ]}
                    >
                        <TextInput
                            placeholderTextColor="#000"
                            secureTextEntry={
                                data.passwordConfirmationEye ? true : false
                            }
                            style={(styles.textInput, styles.textInputPass)}
                            autoCapitalize="none"
                            onChangeText={(val) =>
                                handlePasswordConfirmationChange(val)
                            }
                        />
                        <TouchableOpacity
                            onPress={updatePasswordConfirmationEye}
                        >
                            {data.passwordConfirmationEye ? (
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                    style={{ marginTop: 3 }}
                                />
                            ) : (
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                    style={{ marginTop: 3 }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    {!registrationError.EqualPassword && (
                        <Text style={[styles.error]}>
                            {notEqualPasswordText}
                        </Text>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={onRegisterPress}
                    >
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            Utwórz konto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignInScreen")}
                    >
                        <Text
                            style={{
                                color: "#69667C",
                                fontWeight: "bold",
                                marginTop: 10,
                                fontSize: 15,
                            }}
                        >
                            Masz już konto?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        width: "85%",
        marginLeft: "7.5%",
    },
    title: {
        fontSize: 33,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    textInput: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#E2E1E1",
        borderRadius: 40,
        marginBottom: 10,
    },
    inputTitle: {
        marginLeft: marginLeftText,
        marginBottom: marginBottomText,
        marginTop: 10,
        fontSize: 16,
        fontWeight: "900",
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1,
        marginBottom: 4,
    },
    passwordContainer: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#E2E1E1",
        borderRadius: 40,
        marginBottom: 15,
    },
    textInputPass: {
        flex: 1,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    registerButton: {
        flexDirection: "row",
        height: 50,
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#362893",
        borderRadius: 20,
        padding: 10,
    },
    descriptionPassword: {
        marginLeft: marginLeftText,
        color: "black",
        fontSize: 15,
        marginBottom: 10,
    },
    error: {
        marginLeft: marginLeftText,
        color: "red",
        fontSize: 15,
        marginBottom: 10,
    },
});
