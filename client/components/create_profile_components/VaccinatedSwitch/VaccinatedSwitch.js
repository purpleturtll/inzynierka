import React from "react";
import { View, Text } from "react-native";
import CustSwitch from "../../CustSwitch";
import styles from "../styles";
function VaccinatedSwitch(props) {
  return (
    <View style={styles.switch}>
      <Text style={styles.switchTitle}>Zaszczepiony</Text>

      <CustSwitch
        isEnabled={props.isVaccinated}
        toggleSwitch={props.setIsVaccinated}
      />
    </View>
  );
}

export default VaccinatedSwitch;
