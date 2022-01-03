import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/cat.png")} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("RegistrationScreen")}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            Utwórz konto użytkownika
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}
            onPress={() => navigation.navigate("ShelterRegistrationScreen")}
          >
            Reprezentujesz schronisko?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

//#362893

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  logo: {
    marginTop: height * 0.24,
    marginLeft: "4%",
    width: height_logo,
    height: height_logo,
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },

  loginButton: {
    flexDirection: "row",
    width: 200,
    marginTop: height * 0.05,
    marginBottom: height * 0.13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#362893",
    borderRadius: 20,
    padding: 25,
    paddingVertical: 20,
  },
});
