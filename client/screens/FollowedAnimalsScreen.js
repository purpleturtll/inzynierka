import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import AnimalCard from "../components/AnimalCard";
import { AnimalDataContext } from "../contexts/AnimalContext";
import { UserContext } from "../contexts/UserContext";
import { FilterContext } from "../contexts/FilterContext";

const FollowedAnimalsScreen = ({ navigation }) => {
  const apiUrl = Constants.manifest.extra.apiUrl;
  const userCtx = useContext(UserContext);
  const animalCtx = useContext(AnimalDataContext);
  const filterCtx = useContext(FilterContext);
  const [favs, setFavs] = useState([]);

  // Wywołanie na każdy follow/unfollow (TODO) i filtrowanie
  useEffect(async () => {
    console.log("useEffect called on chuj, updating list...");
    var params = new URLSearchParams({ favourite: userCtx.userData.userId });
    await animalCtx.updateAnimals(userCtx.userData.token, params);
    updateFavourites();
  }, []);

  useEffect(async () => {
    console.log("useEffect called on FollowedAnimalsScreen, updating list...");
    await updateFavourites();
  }, [animalCtx]);

  async function updateFavourites() {
    var params = new URLSearchParams({ favourite: userCtx.userData.userId });
    var { newJwt, _favs } = await getFavourites(userCtx.userData.token, params);
    // Powtórne wywołanie z nowym jwt w przypadku utraty ważności
    if (newJwt) var { newJwt, _favs } = await getFavourites(newJwt, params);
    //Serwer nie znalazł wyników
    if (_favs == null) _favs = [];
    console.log("Favourites object update:\n" + JSON.stringify(_favs));
    //TODO: obrazki z bazy, temp solution
    _favs.forEach((animal) => {
      //wycięcie daty
      animal.admission_date = animal.admission_date.substring(0, 10);
    });
    setFavs(_favs);
  }

  //GET /animal/read?favourite=userId
  async function getFavourites(tokenStr, params) {
    var _favs = [],
      status = null,
      newJwt = null;
    var res = await fetch(`${apiUrl}/animal/read?` + params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenStr,
      },
      method: "GET",
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then(async (data) => {
        switch (status) {
          case 200:
            // OK
            var jsonStr = JSON.stringify(data);
            _favs = JSON.parse(jsonStr);
            break;
          case 401:
            // jwt expired
            if (userCtx.userData.email) {
              var { newToken, userId } = await userCtx.relogin();
              _favs = [];
              newJwt = newToken;
              console.log(
                "Refreshed jwt token for user " + userId + ":\n" + newToken
              );
            }
            break;
          default:
            console.log("Unhandled getFavourites response status: " + status);
            break;
        }
      }).catch((reason) => {
        console.log("getFavourites error:" + reason);
      });

    return { newJwt, _favs };
  }

  function CountToPolish(count) {
    switch (count) {
      case 0:
        return "Nie masz jeszcze ulubieńców.";
      case 1:
        return "Masz jednego ulubieńca:";
      default:
        return `Masz ${count} ulubieńców:`;
    }
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        {/*Lista zwierzaków*/}
        <View style={styles.list}>
          <Text style={styles.infoText}>{CountToPolish(animalCtx.animals.filter(a => a.favourite).length)}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={animalCtx.animals}
            renderItem={({ item }) => {
              if (item.favourite) {
                <AnimalCard animalId={item.id} navigation={navigation} />
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default FollowedAnimalsScreen;

//#362893

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 10,
  },
  list: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E2E1E1",
    padding: 10,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    paddingTop: "5%",
    alignItems: "stretch",
  },
});
