import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { AnimalDataContext } from "../contexts/AnimalContext";
import Constants from "expo-constants";
import { UserContext } from "../contexts/UserContext";
import { Feather } from "@expo/vector-icons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const apiUrl = Constants.manifest.extra.apiUrl;
export default MyAnimalOptions = ({ animalId, navigation }) => {
    //  kontekst typ usera
    const userCtx = useContext(UserContext);

    useEffect(() => { }, [userCtx]);

    {
        /*Kontekst zwierząt*/
    }
    const animalCtx = useContext(AnimalDataContext);
    var animal = animalCtx.getAnimal(animalId);

    function age2Polish(age) {
        if (age < 12) {
            return "mies."
        } else if (age < 24) {
            return "rok"
        } else if (age >= 24 && age < 60) {
            return "lata"
        }
        return "lat"
    }

    function getWeightUnit(weight) {
        if (weight < 1000) {
            return "g"
        }
        return "kg"
    }

    function onDelete() {
        animalCtx.deleteAnimal(animalId);
        animalCtx.updateAnimals(userCtx.userData.userId, new URLSearchParams({ id: animalId }));
    }

    function onGoToProfile() {
        navigation.navigate("AnimalDetailsScreen", animal);
    }

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={onGoToProfile}>
                <View style={styles.headline}>
                    <Text style={styles.headlineName}>{animal.name}</Text>
                    <Text>{animal.breed}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ alignItems: "flex-end", flex: 1 }}>
                <TouchableOpacity onPress={onDelete}>
                    <Feather
                        name="trash-2"
                        color="#4A4A4A"
                        size={50}
                        style={{ textAlignVertical: "center", paddingRight: 13 }}
                    />
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 6,
        shadowColor: "#fff",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        overflow: "hidden",
        alignItems: "flex-start",
    },
    cardUser: {
        marginVertical: 20,
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 6,
        shadowColor: "#fff",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        overflow: "hidden",
        alignItems: "center",
    },
    headline: {
        flexDirection: "column",
        paddingTop: 3,
        paddingBottom: 5,
    },
    headlineName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    headlineDate: {
        fontSize: 16,
    },
    image: {
        resizeMode: "cover",
        width: windowWidth * 0.8,
        height: 200,
    },
    heart: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingLeft: 10,
    },
});
