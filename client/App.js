import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import AppContext from './contexts/AppContext';
import { FilterDataProvider } from './contexts/FilterContext';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState('');

  const userSettings = {
    loggedIn: loggedIn,
    userToken: userToken,
    setLoggedIn,
    setUserToken
  };

  return (
    <AppContext.Provider value={userSettings}>
      {/* All other components are wrapped by the AppContext and FilterContext providers*/}
      <FilterDataProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </FilterDataProvider>
    </AppContext.Provider>
  );
}
export default App;