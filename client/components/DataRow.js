import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, Entypo, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const ROW_TYPE = {
    TYPE: 'Typ',
    BREED: 'W typie rasy',
    SEX: 'Płeć',
    WEIGHT: 'Waga',
    AGE: 'Wiek',
    LOCATION: 'Lokalizacja',
    DATE: 'Data przyjęcia',
    DESCRIPTION: 'Opis',
    CHIP: 'Chip',
    VACCINATED: 'Szczepienia',
    STERILIZED: 'Sterylizacja'
};

function age2Polish(age) {
    if (age < 12) {
        return "mies."
    } else if (age < 24) {
        return "rok"
    } else if (age >= 24 && age < 60) {
        return "lata"
    }
    return "lat"
}

{/*Wiersz z danymi*/ }
const DataRow = ({ label, data }) => {

    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    switch (label) {
        case ROW_TYPE.TYPE:
        case ROW_TYPE.BREED:
            return (
                <View style={styles.rowView}>
                    <Entypo
                        name='baidu'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data}</B></Text>
                </View>
            )
        case ROW_TYPE.SEX:
            return (
                <View style={styles.rowView}>
                    <Ionicons
                        name={(data == 'samica') ? 'female' : 'male'}
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data}</B></Text>
                </View>
            )
        case ROW_TYPE.WEIGHT:
            return (
                <View style={styles.rowView}>
                    <FontAwesome5
                        name='weight'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    {data < 1000 && <Text>{label}: <B>{data} g</B></Text>}
                    {data >= 1000 && <Text>{label}: <B>{data / 1000} kg</B></Text>}
                </View>
            )
        case ROW_TYPE.AGE:
            return (
                <View style={styles.rowView}>
                    <Ionicons
                        name='hourglass-outline'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    {data < 12 && <Text>{label}: <B>{data} mies.</B></Text>}
                    {data >= 12 && <Text>{label}: <B>{Math.floor(data / 12)} {age2Polish(data)}</B></Text>}
                </View>
            )
        case ROW_TYPE.LOCATION:
            return (
                <View style={styles.rowView}>
                    <Entypo
                        name='location-pin'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    <Text>Miasto: <B>{data}</B></Text>
                </View>
            )
        case ROW_TYPE.DATE:
            return (
                <View style={styles.rowView}>
                    <AntDesign
                        name='calendar'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data}</B></Text>
                </View>
            )
        case ROW_TYPE.CHIP:
            return (
                <View style={styles.rowView}>
                    <Ionicons
                        name='hardware-chip'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data}</B></Text>
                </View>
            )
        case ROW_TYPE.VACCINATED:
            return (
                <View style={styles.rowView}>
                    <FontAwesome5
                        name='syringe'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data ? 'tak' : 'nie'}</B></Text>
                </View>
            )
        case ROW_TYPE.STERILIZED:
            return (
                <View style={styles.rowView}>
                    <MaterialCommunityIcons
                        name='rabbit'
                        color='black'
                        size={20}
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data ? 'tak' : 'nie'}</B></Text>
                </View>
            )
        case ROW_TYPE.DESCRIPTION:
        default:
            return (
                <Text style={styles.rowView}>
                    {data}
                </Text>
            )
    }
}

export default DataRow;

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '2%',
    },
    icon: {
        paddingRight: 10
    }
});