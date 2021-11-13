import React, { useState } from "react";
import { TextInput, View, Text } from 'react-native';
import styles from '../styles';


function Chip({ changeChip, profileError, wrongCHIPFormat}) {
  return (
    <View>
      <Text style={[styles.marginsText, styles.headerTitle]}>Numer chip (opcjonalne)</Text>
      <TextInput
        placeholderTextColor="#000"
        placeholderStyle={{}}
        style={[styles.textInput, profileError.invalidCHIP ? styles.inputError : null]}
        onChangeText={(val) => changeChip(val)}
      />
      {profileError.invalidCHIP && <Text style={[styles.error]}>{errorTrue}</Text>}
      {profileError.wrongCHIPFormat && <Text style={[styles.error]}>{wrongCHIPFormat}</Text>}
    </View>
  );
}
export default Chip;
