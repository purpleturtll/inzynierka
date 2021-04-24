import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MainStackNavigator, MessageStackNavigator, FollowedStackNavigator, AccountStackNavigator} from './StackNavigation';
import {Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return(
    <Tab.Navigator
          initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#362893',
      }}>
      <Tab.Screen name="HomeScreen" component={MainStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ), }}
      />
      <Tab.Screen name="messages" component={MessageStackNavigator}
         options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="mail" color={color} size={size} />
          ), }}
      />
      <Tab.Screen name="followed" component={FollowedStackNavigator}
         options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ), }}
      />
      <Tab.Screen name="account" component={AccountStackNavigator}
         options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ), }}
      />
    </Tab.Navigator>
  )
} 

export default BottomTabNavigator;
