import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { AnimalDataContext } from "../contexts/AnimalContext";
import Constants from "expo-constants";
import { UserContext } from "../contexts/UserContext";

const apiUrl = Constants.manifest.extra.apiUrl;
export default AnimalCard = ({ animalId, navigation }) => {
  //  kontekst typ usera
  const userCtx = useContext(UserContext);

  useEffect(() => { }, [userCtx]);

  {
    /*Kontekst zwierząt*/
  }
  const animalCtx = useContext(AnimalDataContext);
  var animal = animalCtx.getAnimal(animalId);

  {
    /*Funkcja nawigująca do AnimalDetailsScreen (klik na obrazku AnimalCard)*/
  }
  function onAnimalPress(anim) {
    navigation.navigate("AnimalDetailsScreen", anim);
  }

  {
    /*Pomocnicza*/
  }
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

  {
    /*Nazwy ikon serduszek*/
  }
  const hearts = {
    icon: {
      true: "heart",
      false: "hearto",
    },
  };

  {
    /*Karta*/
  }
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onAnimalPress(animal)}>
        <Image
          source={{ uri: `${apiUrl}/pictures/00${animalId}.jpg` }}
          style={styles.image}
        />
      </TouchableOpacity>
      {/*info*/}
      <View style={{ padding: 10, flexDirection: "row" }}>
        {/*blok tekstu*/}
        <View>
          {/*tytuł*/}
          <View style={styles.headline}>
            <Text style={styles.headlineName}>{animal.name} </Text>
            <Text style={styles.headlineDate}>{animal.admission_date}</Text>
          </View>
          {/*TODO: wyświetlanie wieku w miesiącach*/}
          <Text>{animal.breed}</Text>
          <Text>
            {animal.sex}, {animal.age < 12 && animal.age}{animal.age >= 12 && Math.floor(animal.age / 12)} {age2Polish(animal.age)}, {animal.weight < 1000 && animal.weight}{animal.weight >= 1000 && Math.floor(animal.weight / 1000)}{" "}{getWeightUnit(animal.weight)}
          </Text>
        </View>

        {/*kolor serduszka #ff4242*/}
        {userCtx.userData.loggedIn && !userCtx.userData.isShelter && (
          <TouchableOpacity
            onPress={() => {
              {
                /*stan globalny w AnimalDataContext, TODO: animalCtx.getAnimal(id)*/
              }
              animalCtx.updateFavourite(animal.id);
            }}
          >

            <View style={styles.heart}>
              <AntDesign
                name={hearts.icon[animal.favourite]}
                size={30}
                color="#d12115"
              />
            </View>

          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 6,
    shadowColor: "#fff",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    overflow: "hidden",
  },
  headline: {
    flexDirection: "row",
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
    width: 300,
    height: 200,
  },
  heart: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "35%",
    marginTop: 18,
  },
});
