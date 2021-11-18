import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles";

const marginLeftText = "5%";
const marginBottomText = 10;
const errorText = "Podaj wiek";

function Age({
  handleYearsChange,
  handleMonthsChange,
  years,
  months,
  createProfileError,
}) {
  return (
    //   <View>
    //   <View style={styles.standardHeader}>
    //     <Text style={[{ marginLeft: marginLeftText, marginBottom: marginBottomText }, styles.headerTitle]}>Wiek</Text>
    //     <RadioForm
    //       radio_props={radio_age_props}
    //       initial={0}
    //       formHorizontal={true}
    //       buttonColor={'#362893'}
    //       selectedButtonColor={'#362893'}
    //       borderWidth={1}
    //       buttonSize={15}
    //       style={{ marginLeft: 20, marginTop: 2 }}
    //       labelStyle={{ marginRight: 15 }}
    //       onPress={(value) =>
    //       changeAgeFormat(value)
    //       }
    //     />
    //   </View>
    //   <TextInput
    //     placeholderTextColor="#000"
    //     placeholderStyle={{}}
    //     style={[styles.textInput, styles.textInputCollapse, profileError.invalidAge ? styles.inputError : null]}
    //     autoCapitalize="none"
    //     onChangeText={(val) => changeAge(val)}
    //   />
    //   {profileError.invalidAge && <Text style={[styles.error]}>{errorTrue}</Text>}
    // </View>

    <View>
      <View style={styles.standardHeader}>
        <Text
          style={[
            { marginLeft: marginLeftText, marginBottom: marginBottomText },
            styles.headerTitle,
          ]}
        >
          Wiek
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignContent: "space-around" }}>
        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={[
            styles.textInputAge,
            createProfileError.invalidAge ? styles.inputError : null,
          ]}
          autoCapitalize="none"
          value={years}
          onChangeText={(val) => handleYearsChange(val)}
        />
        <Text style={{ fontSize: 17, paddingTop: 10, marginLeft: 10 }}>kg</Text>

        <TextInput
          placeholderTextColor="#000"
          placeholderStyle={{}}
          style={[
            styles.textInputAge,
            createProfileError.invalidAge ? styles.inputError : null,
          ]}
          autoCapitalize="none"
          value={months}
          onChangeText={(val) => handleMonthsChange(val)}
        />
        <Text style={{ fontSize: 17, paddingTop: 10, marginLeft: 10 }}>g</Text>
      </View>
      {createProfileError.invalidAge && (
        <Text style={[styles.error]}>{errorText}</Text>
      )}
    </View>
  );
}

export default Age;
