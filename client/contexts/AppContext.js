import React, {useEffect, useState} from "react";

export const AppContext = React.createContext();

export const AppDataProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userToken, setUserToken] = useState('');

    useEffect(() => {
        console.log('new userToken set on AppCtx: ' + userToken);
    }, [userToken]);

    useEffect(() => {
        console.log('new loggedIn set on AppCtx: ' + (loggedIn ? 'true' : 'false'));
    }, [loggedIn]);

    return(
        <AppContext.Provider value={{ loggedIn, userToken, setLoggedIn, setUserToken }}>
            {children}
        </AppContext.Provider>
    );  
}
