import React, { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('loginToken'));
    const [user, setUser] = useState(localStorage.getItem('username'))

    //   useEffect(() => {
    //     // Pull saved login state from localStorage / AsyncStorage
    //   }, []);

    const authContextValue = {
        setLoggedIn,
        setUser,
        user,
        loggedIn,
    };

    return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
