import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TempScreen from './screens/TempScreen';
import SignInScreen from './screens/SignInScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DoneRegistrationScreen from './screens/DoneRegistrationScreen';
import PasswordRecoveryScreen from './screens/PasswordRecoveryScreen';
import PasswordRecoveryEmailScreen from './screens/PasswordRecoveryEmailScreen';
import ShelterRegistrationScreen from './screens/ShelterRegistrationScreen';
import ChooseAccountTypeScreen from './screens/ChooseAccountTypeScreen';


const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TempScreen"
      >
        <Stack.Screen name="TempScreen" component={TempScreen} />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            title: ' '
          }}
        />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}
          options={{
            title: ''
          }} />
        <Stack.Screen name="DoneRegistrationScreen" component={DoneRegistrationScreen}
          options={{ headerShown: false }} />
        <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen}
          options={{
            title: ' '
          }}
        />
        <Stack.Screen name="PasswordRecoveryEmailScreen" component={PasswordRecoveryEmailScreen}
          options={{
            title: ' '
          }}
        />
        <Stack.Screen name="ShelterRegistrationScreen" component={ShelterRegistrationScreen}
          options={{
            title: ' '
          }}
        />
        <Stack.Screen name="ChooseAccountTypeScreen" component={ChooseAccountTypeScreen}
          options={{
          title: ' '
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

