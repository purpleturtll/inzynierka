import React, { useState } from "react";
import{TextInput} from 'react-native';
import styles from '../styles';


function Name({changeName, profileError}){
  console.log(styles)
  return(
    <TextInput
      placeholderTextColor="#000"
      placeholderStyle={{}}
      style={[styles.textInput, profileError.invalidName ? styles.inputError : null]}
      onChangeText={(val) => changeName(val)}
    />
  );
}
export default Name;
