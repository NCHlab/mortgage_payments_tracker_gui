import { useNavigate } from "react-router-dom";

import { useAuth } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'

const useLogout = () => {

    const { logout } = AuthService();
    const { setLoggedIn, setUser } = useAuth();
    const navigate = useNavigate();

    const _logout = async () => {

        await logout();

        setLoggedIn(false);
        localStorage.removeItem("loginToken");
        localStorage.removeItem("username")
        setUser("Not Logged In");

        navigate('/home');

    }
    return { handleMainLogOut: _logout }
}

export default useLogout
