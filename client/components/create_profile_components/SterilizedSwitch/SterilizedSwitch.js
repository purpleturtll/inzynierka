import React from "react";
import { View, Text } from "react-native";
import CustSwitch from "../../CustSwitch";
import styles from "../styles";

function SterilizedSwitch(props) {
  return (
    <View style={styles.switch}>
      <Text style={styles.switchTitle}>Wykastrowany</Text>
      <CustSwitch
        isEnabled={props.isSterilized}
        toggleSwitch={props.setIsSterilized}
      />
    </View>
  );
}

export default SterilizedSwitch;
