import React, { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('loginToken'));
    const [user, setUser] = useState(localStorage.getItem('username') || "Not Logged in")
    //   useEffect(() => {
    //     // Pull saved login state from localStorage / AsyncStorage
    //   }, []);

    const local_logout = () => {
        setLoggedIn(false)
        setUser("Not Logged in")
        localStorage.removeItem("loginToken");
        localStorage.removeItem("username")
    }

    const authContextValue = {
        setLoggedIn,
        setUser,
        local_logout,
        user,
        loggedIn,
    };

    return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
