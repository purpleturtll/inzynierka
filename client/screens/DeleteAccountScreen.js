import React, { useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { UserContext } from '../contexts/UserContext';
import Constants from 'expo-constants';
const apiUrl = Constants.manifest.extra.apiUrl;

const ChangeEmailScreen = ({ navigation }) => {
  const userCtx = useContext(UserContext);

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
            {/* <Text style={styles.text}>
              Potwierdź decyzję poprzez {"\n"}kliknięcie w link przesłany {"\n"}
              przez e-mail.
            </Text> */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                fetch(`${apiUrl}/auth/unregister`, {
                  body: JSON.stringify({
                    user_id: userCtx.userData.userId,
                    is_shelter: userCtx.userData.isShelter,
                  }),
                  headers: { "Content-Type": "application/json" },
                  method: 'DELETE'
                })
                userCtx.setUserData({
                  loggedIn: false,
                  token: '',
                  userId: null,
                  isShelter: false,
                  email: '',
                  password: '',
                  username: '',
                });
                navigation.navigate("DeletedAccountScreen")
              }}
            >
              <Text style={{ color: "#fff", fontSize: 17 }}>Usuń</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView >
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
