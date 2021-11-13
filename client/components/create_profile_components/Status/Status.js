import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';


function Status(changeStatus, profileError, animalStatus, animalStatusFilter){
  return (
    <View>
    <View style={styles.standardHeader}>
      <Text style={[styles.marginsText, styles.headerTitle]}>Status (wielokrotny wybór)</Text>
    </View>
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      keyExtractor={(item) => item.id}
      data={animalStatus}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => { changeStatus(item.id) }}>
          <LabelStatus item={item} selected={animalStatusFilter} />
          {animalStatusFilter == item.id ? <Text style={[styles.label, styles.selected]}>{item.label}</Text> : <Text style={[styles.label]}>{item.label}</Text>}
        </TouchableOpacity>
      )}
    />
    {profileError.unselectedStatus && <Text style={[styles.error]}>{unselectedStatus}</Text>}
  </View>

  );
}

export default Status;
