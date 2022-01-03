import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { AnimalDataContext } from "../contexts/AnimalContext";
import Constants from "expo-constants";
const apiUrl = Constants.manifest.extra.apiUrl;
export default AnimalCard = ({ animalId, navigation }) => {
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
    switch (age) {
      case 1:
        return "rok";
      case 2:
      case 3:
      case 4:
        return "lata";
      default:
        return "lat";
    }
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
            {animal.sex}, {animal.age} {age2Polish(animal.age)}, {animal.weight}{" "}
            kg
          </Text>
        </View>
        {/*kolor serduszka #ff4242*/}
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
