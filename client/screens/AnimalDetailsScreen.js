import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import DataRow from "../components/DataRow";
import StatusDataRow from "../components/StatusDataRow";
import { UserContext } from "../contexts/UserContext";
import { AnimalDataContext } from "../contexts/AnimalContext";
import Constants from "expo-constants";

const apiUrl = Constants.manifest.extra.apiUrl;

const AnimalDetailsScreen = ({ route, navigation }) => {
  const animalCtx = useContext(AnimalDataContext);
  const animal = animalCtx.getAnimal(route.params.id);
  const {
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
    chip_number,
    is_sterilized,
    is_vaccinated,
  } = route.params;

  // kontekst user

  const userCtx = useContext(UserContext);

  useEffect(() => {}, [userCtx]);

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              source={{ uri: `${apiUrl}/pictures/00${animal.id}.jpg` }}
              style={styles.image}
            ></Image>
          </View>
          <View style={styles.nameRow}>
            {userCtx.userData.loggedIn && !userCtx.userData.isShelter && (
              <View style={styles.heartView}>
                <HeartIcon favourite={favourite} />
              </View>
            )}
            <Text style={styles.name}>{animal.name}</Text>
          </View>
          <DataRow label={"Typ"} data={type} />
          <DataRow label={"W typie rasy"} data={breed} />
          <DataRow label={"Płeć"} data={sex} />
          {/*TODO - status*/}
          <StatusDataRow status={{ adoptable, recently_found }} />
          <DataRow label={"Waga"} data={weight} />
          <DataRow label={"Wiek"} data={age} />
          <DataRow label={"Lokalizacja"} data={animal.shelter_city} />
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
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    flex: 5,
  },
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
    alignItems: "flex-start",
  },
  groupedRow: {
    flex: 1,
    flexDirection: "row",
  },
  nameRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
});
