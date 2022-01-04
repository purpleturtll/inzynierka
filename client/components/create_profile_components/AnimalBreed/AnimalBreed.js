import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Feather } from "@expo/vector-icons";

import styles from "../styles";

function AnimalBreed({
  animalTypeFilter,
  breedNameIcon,
  setFilterValue,
  setBreedFilter,
  setBreedNameIcon,
  dogRaces,
  catRaces,
}) {
  return (
    <View>
      {(animalTypeFilter == null ||
        animalTypeFilter == "0" ||
        animalTypeFilter == "1") && (
          <Collapse
            onToggle={() => {
              if (breedNameIcon == "chevron-down") {
                setBreedNameIcon("chevron-up");
              }
              if (breedNameIcon == "chevron-up") {
                setBreedNameIcon("chevron-down");
              }
            }}
          >
            <CollapseHeader>
              <View style={[styles.marginsText, styles.collapse]}>
                <Text style={styles.headerTitle}>W typie rasy</Text>
                <Feather
                  name={breedNameIcon}
                  color="black"
                  size={22}
                  style={{ marginTop: 3 }}
                />
              </View>
            </CollapseHeader>
            <CollapseBody>
              {/* || animalTypeFilter == null */}
              {animalTypeFilter == "0" && (
                <View
                  style={[styles.marginsText, styles.raceCategoriesContainer]}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>Pies</Text>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <FlatList
                      contentContainerStyle={{ alignItems: "center" }}
                      numColumns={2}
                      keyExtractor={(item) => item.id}
                      data={dogRaces}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setFilterValue("race", item.id);
                            setBreedFilter(item.id);
                          }}
                        >
                          {animalTypeFilter == item.id ? (
                            <Text style={[styles.label, styles.selected]}>
                              {item.label}
                            </Text>
                          ) : (
                            <Text style={[styles.label]}>{item.label}</Text>
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              )}

              {animalTypeFilter == "1" && (
                <View
                  style={[styles.marginsText, styles.raceCategoriesContainer]}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>Kot</Text>
                  <FlatList
                    contentContainerStyle={{ alignItems: "center" }}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    data={catRaces}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setFilterValue("race", item.id);
                          setBreedFilter(item.id);
                        }}
                      >
                        {animalTypeFilter == item.id ? (
                          <Text style={[styles.label, styles.selected]}>
                            {item.label}
                          </Text>
                        ) : (
                          <Text style={[styles.label]}>{item.label}</Text>
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </CollapseBody>
          </Collapse>
        )}
    </View>
  );
}

export default AnimalBreed;
