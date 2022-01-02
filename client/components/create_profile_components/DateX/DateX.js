import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles";

function DateX({ handleDateChange }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const getCurrentDate = () => {
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    return day + "-" + month + "-" + date.getFullYear();
  };

  const [text, setText] = useState(getCurrentDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);

    let tempDate = new Date(currentDate);
    let day = String(tempDate.getDate()).padStart(2, "0");
    let month = String(tempDate.getMonth() + 1).padStart(2, "0");
    let tempText = day + "-" + month + "-" + tempDate.getFullYear();

    handleDateChange(tempDate);
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
