import React, {useState} from "react";

export const AppContext = React.createContext();

export const AppDataProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userToken, setUserToken] = useState('');

    const userSettings = {
        loggedIn: loggedIn,
        userToken: userToken,
        setLoggedIn,
        setUserToken
    };

    return(
        <AppContext.Provider value={userSettings}>
            {children}
        </AppContext.Provider>
    );  
}
