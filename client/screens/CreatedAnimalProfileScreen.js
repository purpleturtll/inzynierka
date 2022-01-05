import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CreatedAnimalProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.check}
        source={require("../assets/animal-shelter.png")}
      />
      <Text style={styles.title}>Ogłoszenie zostało dodane!</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateAnimalProfileScreen")}
      >
        <Ionicons
          name="md-add-circle"
          size={44}
          color="white"
          style={{ flex: 2, marginLeft: 15 }}
        />

        <Text style={{ color: "#fff", fontSize: 19, flex: 5 }}>
          Dodaj kolejne
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatedAnimalProfileScreen;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: height * 0.14,
  },
  check: {
    width: 170,
    height: 170,
  },
  title: {
    marginTop: height * 0.04,
    marginBottom: height * 0.09,
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
  },
  addIcon: {
    marginLeft: 30,
    marginRight: 15,
    width: 40,
    height: 40,
  },
  addButton: {
    flexDirection: "row",
    marginTop: 20,
    width: width * 0.6,
    paddingVertical: 13,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#362893",
  },
});
