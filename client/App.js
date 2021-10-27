import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { UserDataProvider } from './contexts/UserContext';
import { FilterDataProvider } from './contexts/FilterContext';
import { AnimalDataProvider } from './contexts/AnimalContext';

const App = () => {
  return (
    <UserDataProvider>
      {/*Context wrapping*/}
      <FilterDataProvider>
        <AnimalDataProvider>
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </AnimalDataProvider>
      </FilterDataProvider>
    </UserDataProvider>
  );
}
export default App;