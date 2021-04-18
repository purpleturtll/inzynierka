import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TempScreen from './screens/TempScreen';
import SignInScreen from './screens/SignInScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TempScreen"
      >
        <Stack.Screen name="TempScreen" component={TempScreen} />
        <Stack.Screen
          name = "SignInScreen"
          component={SignInScreen}
          options={{
            title:' '
          }}       
        />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}
         options={{
          title: ''}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
