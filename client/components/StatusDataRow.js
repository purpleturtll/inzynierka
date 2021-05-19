import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StatusDataRow = ({ status }) => {
    if(status.adoptable && status.urgent)
    {
        return(
            <View style={styles.rowView}>
                <MaterialCommunityIcons 
                  name="lightbulb-on" 
                  size={20} 
                  color="black"
                  style={styles.icon}
                />
                <Text>Status:</Text>
                <StatusLabel text={'do adopcji'}/>
                <StatusLabel text={'pilne'}/>
            </View>
        );
    }
    else if(status.adoptable)
    {
        return(
            <View style={styles.rowView}>
                <MaterialCommunityIcons 
                  name="lightbulb-on" 
                  size={20} 
                  color="black"
                  style={styles.icon}
                />
                <Text>Status:</Text>
                <StatusLabel text={'do adopcji'}/>
            </View>
        );
    }
    else if(status.urgent)
    {
        return(
            <View style={styles.rowView}>
                <MaterialCommunityIcons 
                  name="lightbulb-on" 
                  size={20} 
                  color="black"
                  style={styles.icon}
                />
                <Text>Status:</Text>
                <StatusLabel text={'pilne'}/>
            </View>
        );
    }
    else
    {
        return(
            <View style={styles.rowView}>
                <MaterialCommunityIcons 
                  name="lightbulb-on" 
                  size={20} 
                  color="black"
                  style={styles.icon}
                />
                <Text>Status: brak</Text>
            </View>
        );
    } 
}

export default StatusDataRow;

const StatusLabel = ({ text }) => {
    return(
        <View style={styles.label}>
            <Text style={styles.labelText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '2%',
    },
    icon: {
      paddingRight: 10
    },
    label: {
      marginLeft: 8,
      paddingVertical: 3,
      paddingHorizontal: 12,
      backgroundColor: '#362893',
      textAlign: 'center',
      borderRadius: 8
    },
    labelText: {
        color: 'white',
        fontSize: 13,
    }
});