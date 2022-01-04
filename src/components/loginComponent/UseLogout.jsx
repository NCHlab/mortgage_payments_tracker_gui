import { useAuth } from '../../context/AuthContext'

import AuthService from '../../services/AuthService'

import { useNavigate } from "react-router-dom";

const useLogout = () => {

    const { logout } = AuthService();
    const { setLoggedIn, setUser } = useAuth();
    const navigate = useNavigate();

    const _logout = async () => {

        await logout();

        setLoggedIn(false);
        localStorage.removeItem("loginToken");
        localStorage.removeItem("username")
        setUser(null);

        navigate('/login');

    }
    return { handleLogOut: _logout }
}

export default useLogout
