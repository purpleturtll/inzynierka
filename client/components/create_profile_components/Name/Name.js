import React from "react";
import{TextInput, View, Text} from 'react-native';
import styles from '../styles';


function Name({changeName, profileError, errorTrue}){
  return(
    <View>
    <TextInput
      placeholderTextColor="#000"
      placeholderStyle={{}}
      style={[styles.textInput, profileError.invalidName ? styles.inputError : null]}
      onChangeText={(val) => changeName(val)}
    />
      {profileError.invalidName && <Text style={[styles.error]}>{errorTrue}</Text>}
    </View>
  );
}
export default Name;
