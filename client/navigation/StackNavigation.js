import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import DoneRegistrationScreen from '../screens/DoneRegistrationScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import PasswordRecoveryEmailScreen from '../screens/PasswordRecoveryEmailScreen';
import ShelterRegistrationScreen from '../screens/ShelterRegistrationScreen';
import ChooseAccountTypeScreen from '../screens/ChooseAccountTypeScreen';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import FollowedAnimalsScreen from '../screens/FollowedAnimalsScreen';
import AccountScreen from '../screens/AccountScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import ChangedEmailScreen from '../screens/ChangedEmailScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangedPasswordScreen from '../screens/ChangedPasswordScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import DeletedAccountScreen from '../screens/DeletedAccountScreen';
import AnimalDetailsScreen from '../screens/AnimalDetailsScreen';
import CreatedAnimalProfileScreen from '../screens/CreatedAnimalProfileScreen';


const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{
          title: ' '
        }}></Stack.Screen>
      <Stack.Screen name='AnimalDetailsScreen' component={AnimalDetailsScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

const MessageStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Wiadomości' component={MessagesScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

const FollowedStackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen 
        name='Created' 
        component={CreatedAnimalProfileScreen}
        options={{
          title: ' '
        }}
      />
      <Stack.Screen 
        name='Ulubione' 
        component={FollowedAnimalsScreen}
      />
      <Stack.Screen name='AnimalDetailsScreen' component={AnimalDetailsScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: ' '
        }}
      />
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
      <Stack.Screen
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}
        options={{
          title: ' '
        }}
      />
      <Stack.Screen
        name="ChangedEmailScreen"
        component={ChangedEmailScreen}
        options={{
          title: ' '
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: ' '
        }}
      />
      <Stack.Screen
        name="ChangedPasswordScreen"
        component={ChangedPasswordScreen}
        options={{
          title: ' '
        }}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{
          title: ' '
        }}
      />
      <Stack.Screen
        name="DeletedAccountScreen"
        component={DeletedAccountScreen}
        options={{
          title: ' '
        }}
      />

    </Stack.Navigator>
  )
}

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TempScreen"
      >
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
        <Stack.Screen name="MessagesScreen" component={MessagesScreen}
          options={{
            title: ' '
          }}
        />
        <Stack.Screen name="FollowedAnimalsScreen" component={FollowedAnimalsScreen}
          options={{
            title: ' '
          }}
        />
        <Stack.Screen name="AccountScreen" component={AccountScreen}
          options={{
            title: ' '
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {
  MainStackNavigator, MessageStackNavigator, FollowedStackNavigator, AccountStackNavigator,
  MyStack
};


