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

import Constants from 'expo-constants';
const apiUrl = Constants.manifest.extra.apiUrl;

const marginLeftText = "5%";
const marginBottomText = 5;

const ShelterRegistrationScreen = ({ navigation }) => {
    const [data, setData] = useState({
        NIP: "",
        phone_number: "",
        username: "",
        city: "",
        street: "",
        street_number: "",
        postal_code: "",
        description: "",
        email: "",
        password: "",
        check_textInputChange: false,
        passwordEye: true,
        passwordConfirmationEye: true,
    });

    const handleUsernameChange = (val) => {
        setData({
            ...data,
            username: val,
        });
    };

    const handleEmailChange = (val) => {
        setData({
            ...data,
            email: val,
        });
    };

    const handleCityChange = (val) => {
        setData({
            ...data,
            city: val,
        });
    };

    const handleStreetChange = (val) => {
        val = val.split(" ");
        setData({
            ...data,
            street: val[0],
            street_number: val[1],
        });
    };

    const handlePostalCodeChange = (val) => {
        setData({
            ...data,
            postal_code: val,
        });
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    };

    const handleNIPChange = (val) => {
        setData({
            ...data,
            NIP: val,
        });
    };

    const handlePhoneNumberChange = (val) => {
        setData({
            ...data,
            phone_number: val,
        });
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

    //TODO: walidacja
    const onRegisterPress = () => {
        const res = fetch(`${apiUrl}/auth/register_shelter`, {
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                email: data.email,
                phone_number: data.phone_number,
                nip: data.NIP,
                city: data.city,
                street: data.street,
                street_number: data.street_number,
                postal_code: data.postal_code,
                description: "",
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        }).then((response) => {
            if (response.status == 201) {
                navigation.navigate("DoneRegistrationScreen");
            } else {
                navigation.navigate("ShelterRegistrationScreen");
            }
        });
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Rejestracja schroniska</Text>
                <Text
                    style={{
                        marginLeft: marginLeftText,
                        marginBottom: marginBottomText,
                    }}
                >
                    Nazwa schroniska
                </Text>
                <TextInput
                    placeholderTextColor="#000"
                    placeholderStyle={{}}
                    style={styles.textInput}
                    onChangeText={(val) => handleUsernameChange(val)}
                />

                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        NIP
                    </Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={styles.textInput}
                        onChangeText={(val) => handleNIPChange(val)}
                    />
                </View>

                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        Numer telefonu
                    </Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePhoneNumberChange(val)}
                    />
                </View>

                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        Adres e-mail
                    </Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleEmailChange(val)}
                    />
                </View>
                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        Nazwa ulicy i numer budynku
                    </Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleStreetChange(val)}
                    />
                </View>
                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        Kod pocztowy
                    </Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePostalCodeChange(val)}
                    />
                </View>
                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        Miejscowość
                    </Text>
                    <TextInput
                        placeholderTextColor="#000"
                        placeholderStyle={{}}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleCityChange(val)}
                    />
                </View>
                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        Hasło
                    </Text>
                    <View style={styles.passwordContainer}>
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
                </View>
                <View>
                    <Text
                        style={{
                            marginLeft: marginLeftText,
                            marginBottom: marginBottomText,
                        }}
                    >
                        Potwierdź hasło
                    </Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholderTextColor="#000"
                            secureTextEntry={
                                data.passwordConfirmationEye ? true : false
                            }
                            style={(styles.textInput, styles.textInputPass)}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
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
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={onRegisterPress}
                    >
                        <Text style={{ color: "#fff" }}>Utwórz konto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignInScreen")}
                    >
                        <Text
                            style={{
                                color: "#69667C",
                                fontWeight: "bold",
                                marginVertical: 20,
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
export default ShelterRegistrationScreen;

const styles = StyleSheet.create({
    container: {
        width: "85%",
        marginLeft: "7.5%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    textInput: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#E2E1E1",
        borderRadius: 40,
        marginBottom: 15,
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
        marginTop: 20,
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
});
