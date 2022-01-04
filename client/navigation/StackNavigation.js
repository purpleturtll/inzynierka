import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../screens/SignInScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import DoneRegistrationScreen from "../screens/DoneRegistrationScreen";
import PasswordRecoveryScreen from "../screens/PasswordRecoveryScreen";
import PasswordRecoveryEmailScreen from "../screens/PasswordRecoveryEmailScreen";
import ShelterRegistrationScreen from "../screens/ShelterRegistrationScreen";
import ChooseAccountTypeScreen from "../screens/ChooseAccountTypeScreen";
import HomeScreen from "../screens/HomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import FollowedAnimalsScreen from "../screens/FollowedAnimalsScreen";
import AccountScreen from "../screens/AccountScreen";
import ChangeEmailScreen from "../screens/ChangeEmailScreen";
import ChangedEmailScreen from "../screens/ChangedEmailScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangedPasswordScreen from "../screens/ChangedPasswordScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import DeletedAccountScreen from "../screens/DeletedAccountScreen";
import AnimalDetailsScreen from "../screens/AnimalDetailsScreen";
import CreatedAnimalProfileScreen from "../screens/CreatedAnimalProfileScreen";
import CreateAnimalProfileScreen from "../screens/CreateAnimalProfileScreen";
import SeeMoreScreen from "../screens/SeeMoreScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ title: "PetFinder", headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        // options={{ headerTitleAlign: "center" }}
      ></Stack.Screen>
      <Stack.Screen
        name="SeeMoreScreen"
        component={SeeMoreScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="AnimalDetailsScreen"
        component={AnimalDetailsScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const MessageStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ title: "PetFinder", headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const FollowedStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ title: "PetFinder", headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="FollowedAnimalsScreen"
        component={FollowedAnimalsScreen}
      />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen
        name="AnimalDetailsScreen"
        component={AnimalDetailsScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ title: "PetFinder", headerTitleAlign: "center" }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen
        name="DoneRegistrationScreen"
        component={DoneRegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordRecoveryScreen"
        component={PasswordRecoveryScreen}
      />
      <Stack.Screen
        name="PasswordRecoveryEmailScreen"
        component={PasswordRecoveryEmailScreen}
      />
      <Stack.Screen
        name="ShelterRegistrationScreen"
        component={ShelterRegistrationScreen}
      />
      <Stack.Screen
        name="ChooseAccountTypeScreen"
        component={ChooseAccountTypeScreen}
      />
      <Stack.Screen
        name="CreatedAnimalProfileScreen"
        component={CreatedAnimalProfileScreen}
      />
      <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} />
      <Stack.Screen name="ChangedEmailScreen" component={ChangedEmailScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="ChangedPasswordScreen"
        component={ChangedPasswordScreen}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
      />
      <Stack.Screen
        name="DeletedAccountScreen"
        component={DeletedAccountScreen}
      />
    </Stack.Navigator>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignInScreen"
        screenOptions={{ title: "PetFinder", headerTitleAlign: "center" }}
      >
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="DoneRegistrationScreen"
          component={DoneRegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordRecoveryScreen"
          component={PasswordRecoveryScreen}
        />
        <Stack.Screen
          name="PasswordRecoveryEmailScreen"
          component={PasswordRecoveryEmailScreen}
        />
        <Stack.Screen
          name="ShelterRegistrationScreen"
          component={ShelterRegistrationScreen}
        />
        <Stack.Screen
          name="ChooseAccountTypeScreen"
          component={ChooseAccountTypeScreen}
        />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen
          name="FollowedAnimalsScreen"
          component={FollowedAnimalsScreen}
        />
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {
  MainStackNavigator,
  MessageStackNavigator,
  FollowedStackNavigator,
  AccountStackNavigator,
  MyStack,
};
