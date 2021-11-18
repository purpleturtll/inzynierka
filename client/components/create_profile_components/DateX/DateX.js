import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles";

function DateX({ handleDateChange }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + "-" + month + "-" + date;
  };

  const [text, setText] = useState(getCurrentDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);

    let tempDate = new Date(currentDate);
    let tempText =
      tempDate.getFullYear() +
      "-" +
      tempDate.getMonth() +
      "-" +
      tempDate.getDate();

    handleDateChange(tempText);
    setText(tempText);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <Text style={[styles.marginsText, styles.headerTitle]}>
        Data przyjęcia
      </Text>
      <View>
        <TouchableOpacity
          style={[styles.buttonDate]}
          onPress={() => showMode("date")}
        >
          <Text style={{ textAlign: "center" }}>{text}</Text>
        </TouchableOpacity>
      </View>
      {show ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      ) : null}
    </View>
  );
}

export default DateX;
