import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MainStackNavigator, MessageStackNavigator, FollowedStackNavigator, AccountStackNavigator} from './StackNavigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="home" component={MainStackNavigator}/>
      <Tab.Screen name="messages" component={MessageStackNavigator}/>
      <Tab.Screen name="followed" component={FollowedStackNavigator}/>
      <Tab.Screen name="account" component={AccountStackNavigator}/>
    </Tab.Navigator>
  )
} 

export default BottomTabNavigator;
