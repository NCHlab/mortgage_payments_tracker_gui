import React, { createContext, useState } from "react";


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const AuthContext = createContext({});

const AuthProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('loginToken'));

    //   useEffect(() => {
    //     // Pull saved login state from localStorage / AsyncStorage
    //   }, []);

    const login = () => {
        sleep(200).then(() => setLoggedIn(true));
        localStorage.setItem("loginToken", true)
    };

    const logout = () => {
        sleep(200).then(() => setLoggedIn(false));
        localStorage.removeItem("loginToken")
    };

    const authContextValue = {
        login,
        loggedIn,
        logout
    };

    return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
