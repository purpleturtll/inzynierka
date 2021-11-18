import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles";

const marginLeftText = "5%";
const marginBottomText = 10;

function Weight({
  handleKgChange,
  handleGramChange,
  kg,
  g,
  errorTrue,
  createProfileError,
}) {
  return (
    <View>
      <View style={styles.standardHeader}>
        <Text
          style={[
            {
              marginLeft: marginLeftText,
              marginBottom: marginBottomText,
            },
            styles.headerTitle,
          ]}
        >
          Waga
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignContent: "space-around" }}>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={[
            styles.textInputSmall,
            createProfileError.emptyWeight ? styles.inputError : null,
          ]}
          autoCapitalize="none"
          value={kg}
          onChangeText={(val) => handleKgChange(val)}
        />
        <Text style={[styles.textInputName]}>kg</Text>

        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={[
            styles.textInputSmall,
            createProfileError.emptyWeight ? styles.inputError : null,
          ]}
          autoCapitalize="none"
          value={g}
          onChangeText={(val) => handleGramChange(val)}
        />
        <Text style={[styles.textInputName]}>g</Text>
      </View>

      {createProfileError.emptyWeight && (
        <Text style={[styles.error]}>{errorTrue}</Text>
      )}
    </View>
  );
}

export default Weight;
