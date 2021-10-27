import React, {useEffect, useState} from "react";

export const UserContext = React.createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        loggedIn: false,
        token: '',
        userId: null
    });

    useEffect(() => {
        console.log('new loggedIn set on AppCtx: ' + (userData.loggedIn ? 'true' : 'false'));
    }, [userData.loggedIn]);

    useEffect(() => {
        console.log('new userToken set on AppCtx: ' + userData.token);
    }, [userData.token]);

    useEffect(() => {
        console.log('new userId set on AppCtx: ' + userData.userId);
    }, [userData.userId]);

    return(
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );  
}
