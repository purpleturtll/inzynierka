import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TempScreen from './screens/TempScreen';
import SignInScreen from './screens/SignInScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DoneRegistrationScreen from './screens/DoneRegistrationScreen';
import PasswordRecoveryScreen from './screens/PasswordRecoveryScreen';
import PasswordRecoveryEmailScreen from './screens/PasswordRecoveryEmailScreen';
import ShelterRegistrationScreen from './screens/ShelterRegistrationScreen';
import ChooseAccountTypeScreen from './screens/ChooseAccountTypeScreen';
import HomeScreen from './screens/HomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import FollowedAnimalsScreen from './screens/FollowedAnimals';
import AccountScreen from './screens/AccountScreen';

const Stack = createStackNavigator();

// const MainStackNavigator = () => {
//   return(
//     <Stack.Navigator>
//       <Stack.Screen name='HomeScreen' component={HomeScreen}></Stack.Screen>
//     </Stack.Navigator>
//   )
// }

// const MessageStackNavigator = () => {
//   return(
//     <Stack.Navigator>
//       <Stack.Screen name='MessagesScreen' component={MessagesScreen}></Stack.Screen>
//     </Stack.Navigator>
//   )
// }

// const FollowedStackNavigator = () => {
//   return(
//     <Stack.Navigator>
//       <Stack.Screen name='FollowedAnimalsScreen' component={FollowedAnimalsScreen}></Stack.Screen>
//     </Stack.Navigator>
//   )
// }

// const AccountStackNavigator = () => {
//   return(
//     <Stack.Navigator>
//       {/* <Stack.Screen name='AccountScreen' component={AccountScreen}></Stack.Screen> */}
//       <Stack.Screen name='SignInScreen' component={SignInScreen}/>
//     </Stack.Navigator>
//   )
// }

function Account() {
  return (
      <Stack.Navigator
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
        <Stack.Screen name="HomeScreen" component={HomeScreen}
          options={{
            title: ' '
          }}></Stack.Screen>

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
  );
};

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home" component={Account} />
        <Tab.Screen name="messages" component={MessagesScreen} />
        <Tab.Screen name="followed" component={FollowedAnimalsScreen} />
        <Tab.Screen name="account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigator;
