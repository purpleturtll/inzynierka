import React, { useEffect, useState } from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from '../screens/SplashScreen'
import {MainStackNavigator, MessageStackNavigator, FollowedStackNavigator, AccountStackNavigator} from './StackNavigation';
import {Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    // Tutaj sprawdzanie czy jest token (czy jesteśmy zalogowani)
    // na razie timeout
    setTimeout(()=>{
      setIsLoading(false)
    }, 2000)
  })

  if(isLoading){
    return <SplashScreen/>
  }

  return(
    <Tab.Navigator
          initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#362893',
      }}>
      <Tab.Screen name="HomeScreen" component={MainStackNavigator}
        options={{
          tabBarLabel: 'Główna',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ), }}
      />
      <Tab.Screen name="messages" component={MessageStackNavigator}
         options={{
          tabBarLabel: 'Rozmowy',
          tabBarIcon: ({ color, size }) => (
            <Feather name="mail" color={color} size={size} />
          ), }}
      />
      <Tab.Screen name="followed" component={FollowedStackNavigator}
         options={{
          tabBarLabel: 'Ulubione',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ), }}
      />
      <Tab.Screen name="account" component={AccountStackNavigator}
         options={{
          tabBarLabel: 'Konto',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ), }}
      />
    </Tab.Navigator>
  )
} 

export default BottomTabNavigator;
