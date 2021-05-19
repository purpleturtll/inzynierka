import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

{/*Wiersz z danymi*/}
const DataRow = ({ label, data }) => {

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>


    if(label == 'Typ' || label == 'W typie rasy') {
        return(
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
    }
    else if(label == 'Płeć') {
        if(data == 'samiec')
        {
            return(
                <View style={styles.rowView}>
                    <Ionicons
                        name='male'
                        color='black'
                        size={20} 
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data}</B></Text>
                </View>
            )
        }
        else {
            return(
                <View style={styles.rowView}>
                    <Ionicons
                        name='female'
                        color='black'
                        size={20} 
                        style={styles.icon}
                    />
                    <Text>{label}: <B>{data}</B></Text>
                </View>
            )
        }
        
    }
    else if(label == 'Waga') {
        return(
            <View style={styles.rowView}>
                <FontAwesome5
                    name='weight'
                    color='black'
                    size={20}
                    style={styles.icon}
                />
                <Text>{label}: <B>{data} kg</B></Text>
            </View>
        )
    }
    else if(label == 'Wiek') {
        return(
            <View style={styles.rowView}>
                <Ionicons
                    name='hourglass-outline'
                    color='black'
                    size={20} 
                    style={styles.icon}
                />
                <Text>{label}: <B>{data} mies.</B></Text>
            </View>
        )
    }
    else if(label == 'Lokalizacja') {
        return(
            <View style={styles.rowView}>
                <Entypo
                    name='location-pin'
                    color='black'
                    size={20} 
                    style={styles.icon}
                />
                <Text><B>{data}</B></Text>
            </View>
        )
    }
    else {
        return(
            <View style={styles.rowView}>
                <AntDesign
                    name='calendar'
                    color='black'
                    size={20} 
                    style={styles.icon}
                />
                <Text>{label}: {data}</Text>
            </View>
        )
    }
}

export default DataRow;

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        marginVertical: '2%',
      },
    icon: {
      paddingRight: 10
    }
});