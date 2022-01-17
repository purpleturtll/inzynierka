import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

const AccountScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext);
  var username = userCtx.userData.username;
  useEffect(() => { }, [userCtx]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/user.png")} style={styles.logo} />

        {userCtx.userData.isShelter ? (
          <Text style={styles.welcomeShelter}>
            {username}
          </Text>
        ) : (
          <Text style={styles.welcome}>Witaj, {username}!</Text>
        )}
      </View>
      <View style={styles.body}>
        {/* <View>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ChangeEmailScreen")}
          >
            <Text style={styles.optionText}>Zmień adres e-mail</Text>
            <Feather
              name="chevron-right"
              color="#4A4A4A"
              size={22}
              style={{ textAlignVertical: "center", paddingRight: 13 }}
            />
          </TouchableOpacity>
        </View> */}
        {userCtx.userData.loggedIn && userCtx.userData.isShelter && (
          <View>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate("MyAnimalsScreen")}
            >
              <Text style={styles.optionText}>Moje zwierzęta</Text>
              <Feather
                name="chevron-right"
                color="#4A4A4A"
                size={22}
                style={{ textAlignVertical: "center", paddingRight: 13 }}
              />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          >
            <Text style={styles.optionText}>Zmień hasło</Text>
            <Feather
              name="chevron-right"
              color="#4A4A4A"
              size={22}
              style={{ textAlignVertical: "center", paddingRight: 13 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.replace("DeleteAccountScreen")}
          >
            <Text style={styles.optionText}>Usuń konto</Text>
            <Feather
              name="chevron-right"
              color="#4A4A4A"
              size={22}
              style={{ textAlignVertical: "center", paddingRight: 13 }}
            />
          </TouchableOpacity>
        </View>
        {/*TODO: prawdziwe wylogowanie (appCtx, unieważnienie jwt))*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            userCtx.setUserData({
              loggedIn: false,
              token: '',
              userId: null,
              isShelter: false,
              email: '',
              password: '',
              username: '',
            });
            navigation.replace("SignInScreen")
          }}
        >
          <Text style={styles.buttonText}>Wyloguj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AccountScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.22;

//#362893

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    alignItems: "center",
  },
  logo: {
    width: height_logo,
    height: height_logo,
    marginTop: height * 0.05,
  },
  welcome: {
    marginTop: height * 0.03,
    fontSize: 28,
    fontWeight: "bold",
  },
  welcomeShelter: {
    textAlign: "center",
    marginTop: height * 0.04,
    marginHorizontal: 40,
    fontSize: 27,
    fontWeight: "bold",
  },
  option: {
    flexDirection: "row",
    width: "80%",
    height: 45,
    marginVertical: height * 0.013,
    borderWidth: 3,
    borderColor: "#4A4A4A",
    borderRadius: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: "center",
    marginLeft: "8%",
  },
  body: {
    flex: 2,
    alignItems: "center",
    marginTop: height * 0.15,
  },
  button: {
    width: "30%",
    marginTop: height * 0.014,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#4A4A4A",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
