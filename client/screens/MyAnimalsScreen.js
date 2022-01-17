import React, { useContext, useEffect } from "react";
import {
    Image,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { AnimalDataContext } from "../contexts/AnimalContext";
import MyAnimalOptions from "../components/MyAnimalOptions";

export default function MyAnimalsScreen({ navigation }) {
    const userCtx = useContext(UserContext);
    const animalCtx = useContext(AnimalDataContext);

    return <ScrollView>
        {animalCtx.animals.filter(a => a.shelter_id == userCtx.userData.userId).map((item) => {
            return (
                <View key={item.id}>
                    <MyAnimalOptions animalId={item.id} navigation={navigation} />
                </View>
            );
        })}
    </ScrollView>
}