import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";
import AnimalCard from "../components/AnimalCard";
import { AnimalDataContext } from "../contexts/AnimalContext";
import { UserContext } from "../contexts/UserContext";

const FollowedAnimalsScreen = ({ navigation }) => {
  const animalCtx = useContext(AnimalDataContext);
  const userCtx = useContext(UserContext);
  const userId = userCtx.userData.userId;

  useEffect(async () => {
    await animalCtx.updateAnimals(userId, new URLSearchParams({ "user-id": userId }));
  }, [])

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
            data={animalCtx.animals.filter(a => a.favourite)}
            renderItem={({ item }) => (
              <AnimalCard animalId={item.id} navigation={navigation} />
            )
            }
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
