import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import DataRow from "../components/DataRow";
import StatusDataRow from "../components/StatusDataRow";
import { UserContext } from "../contexts/UserContext";

const AnimalDetailsScreen = ({ route, navigation }) => {
  //TODO: animalCtx.getAnimal(id) zamiast route.params
  const {
    id,
    name, // TODO
    type,
    breed,
    sex,
    favourite,
    adoptable,
    recently_found,
    weight,
    age,
    city,
    admission_date,
    description,
    imageUrl, // TODO
    chip_number,
    is_sterilized,
    is_vaccinated,
  } = route.params;

  const images = {
    animalType: {
      kot: require("../assets/cat_1.jpg"),
      pies: require("../assets/dog_1.jpg"),
      gad: require("../assets/dog_2.jpg"),
    },
  };

  // kontekst user

  const userCtx = useContext(UserContext);

  useEffect(() => {}, [userCtx]);

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image source={images.animalType[type]} style={styles.image} />
          </View>
          <View style={styles.groupedRow}>
            <DataRow label={"Typ"} data={type} />
            {userCtx.userData.loggedIn && !userCtx.userData.isShelter && (
              <View style={styles.heartView}>
                <HeartIcon favourite={favourite} />
              </View>
            )}
          </View>
          <DataRow label={"W typie rasy"} data={breed} />
          <DataRow label={"Płeć"} data={sex} />
          {/*TODO - status*/}
          <StatusDataRow status={{ adoptable, recently_found }} />
          <DataRow label={"Waga"} data={weight} />
          <DataRow label={"Wiek"} data={age} />
          <DataRow label={"Lokalizacja"} data={city} />
          <DataRow label={"Data przyjęcia"} data={admission_date} />
          <DataRow label={"Chip"} data={chip_number}></DataRow>
          <DataRow label={"Szczepienia"} data={is_vaccinated}></DataRow>
          <DataRow label={"Sterylizacja"} data={is_sterilized}></DataRow>
          <DataRow label={"Opis"} data={description}></DataRow>
        </View>
      </ScrollView>
    </View>
  );
};
export default AnimalDetailsScreen;

const HeartIcon = ({ favourite }) => {
  return (
    <View>
      <AntDesign
        name={favourite ? "heart" : "hearto"}
        size={30}
        color="#d12115"
      />
    </View>
  );
};

//granatowy - #362893

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
  },
  imageView: {
    marginVertical: "5%",
    paddingBottom: 5,
    backgroundColor: "#0000",
    borderRadius: 15,
    elevation: 6,
    shadowColor: "#fff",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  heartView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "5%",
  },
  groupedRow: {
    flex: 1,
    flexDirection: "row",
  },
});
