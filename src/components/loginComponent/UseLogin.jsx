import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';

import { useAuth } from '../../context/AuthContext'
import AuthService from '../../services/AuthService'

const useLogin = () => {

    const { login } = AuthService();
    const navigate = useNavigate();
    const { setLoggedIn, setUser } = useAuth();

    const [badLogin, setbadLogin] = useState(false)
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    })

    const [sessionExpired, setSessionExpired] = useState(localStorage.getItem('session_expired') || false)

    const handleChange = (prop, event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const code = await login(values.username, values.password)

        if (code !== 200) {
            setbadLogin(true)
        } else {
            setLoggedIn(true)
            setUser(values.username)
            localStorage.setItem("loginToken", uuid())
            localStorage.setItem('username', values.username)
            localStorage.setItem('session_expired', false)
            navigate('/');
        }
    }

    const classes = {
        textfields: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'grey',
                },
                '&:hover fieldset': {
                    borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#6b0606',
                },
            },
        }
    }

    return {
        classes,
        badLogin,
        values,
        handleChange,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleSubmit,
        sessionExpired
    }
}

export default useLogin
