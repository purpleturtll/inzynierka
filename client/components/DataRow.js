import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

{/*Wiersz z danymi*/}
const DataRow = ({icon, label, data}) => {

    if(icon == 'baidu') {
        return(
        <View style={styles.rowView}>
            <Entypo
                name={icon}
                color='black' 
                size={20} 
                style={styles.icon}
            />
            <Text>{label}: {data}</Text>
        </View>
            
        )
    }
    else {
        return(
            <View styles={styles.rowView}>
                
                <Text>{data}</Text>
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