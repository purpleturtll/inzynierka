import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const ChangeEmailScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/settings.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Usunięcie konta</Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>
              Usunięcie konta jest {"\n"}nieodwracalne i spowoduje, {"\n"}że
              wszystkie Twoje dane {"\n"}zostaną usunięte.
            </Text>
            <Text style={styles.text}>
              Potwierdź decyzję poprzez {"\n"}kliknięcie w link przesłany {"\n"}
              przez e-mail.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("DeletedAccountScreen")}
            >
              <Text style={{ color: "#fff", fontSize: 17 }}>Wyślij e-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ChangeEmailScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.19;

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginLeft: "7.5%",
    paddingTop: 40,
  },
  header: {
    flex: 2,
    alignItems: "center",
  },
  logo: {
    width: height_logo,
    height: height_logo,
    marginTop: height * 0.04,
  },
  body: {
    flex: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.04,
    marginBottom: height * 0.04,
  },
  text: {
    fontSize: 21,
    fontWeight: "900",
    marginBottom: height * 0.03,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: height * 0.01,
  },
  registerButton: {
    flexDirection: "row",
    height: 55,
    width: 170,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#362893",
    borderRadius: 20,
    padding: 10,
  },
});
