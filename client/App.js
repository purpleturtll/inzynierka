import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { AppDataProvider } from './contexts/AppContext';
import { FilterDataProvider } from './contexts/FilterContext';

const App = () => {
  return (
    <AppDataProvider>
      {/* All other components are wrapped by the AppContext and FilterContext providers*/}
      <FilterDataProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </FilterDataProvider>
    </AppDataProvider>
  );
}
export default App;