import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles";

function Description({
  handleDescriptionChange,
  createProfileError,
  errorTrue,
}) {
  return (
    <View>
      <Text style={[styles.marginsText, styles.headerTitle]}>Opis</Text>
      <TextInput
        placeholderTextColor="#000"
        multiline={true}
        style={[
          { textAlignVertical: "top" },
          styles.textInput,
          styles.description,
          createProfileError.invalidDescription ? styles.inputError : null,
        ]}
        autoCapitalize="sentences"
        onChangeText={(val) => handleDescriptionChange(val)}
      />
      {createProfileError.invalidDescription && (
        <Text style={[styles.error]}>{errorTrue}</Text>
      )}
    </View>
  );
}

export default Description;
