import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { AppDataProvider } from './contexts/AppContext';
import { FilterDataProvider } from './contexts/FilterContext';
import { AnimalDataProvider } from './contexts/AnimalContext';

const App = () => {
  return (
    <AppDataProvider>
      {/*Context wrapping*/}
      <FilterDataProvider>
        <AnimalDataProvider>
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </AnimalDataProvider>
      </FilterDataProvider>
    </AppDataProvider>
  );
}
export default App;