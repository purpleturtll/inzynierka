import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles";

function Date({ iconName, createProfileError }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <Text style={[styles.marginsText, styles.headerTitle]}>
        Data przyjęcia
      </Text>
      <View>
        <Button onPress={() => showMode("date")} title="Show date picker!" />
      </View>
      {/* <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      /> */}
      {/* {createProfileError.invalidDate && (
        <Text style={[styles.error]}>{errorTrue}</Text>
      )}
      {createProfileError.wrongDateFormat && (
        <Text style={[styles.error]}>{wrongDateFormat}</Text>
      )} */}
    </View>
  );
}

export default Date;
