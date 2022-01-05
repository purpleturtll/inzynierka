import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

function PickImage(props) {
  return (
    <View>
      <View>
        <Text style={[styles.marginsText, styles.headerTitle]}>
          Dodaj zdjęcie
        </Text>
        <View>
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={props._pickImage}
          >
            <Ionicons name="md-add-circle" size={24} color="black" />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                textAlign: "center",
                marginLeft: 6,
              }}
            >
              Wybierz
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {props.image && (
        <Image
          source={{ uri: props.image }}
          style={{
            width: 200,
            height: 200,
            marginTop: 15,
            alignSelf: "center",
            borderColor: "#c4c4c4",
            borderWidth: 1,
          }}
        />
      )}
    </View>
  );
}

export default PickImage;
