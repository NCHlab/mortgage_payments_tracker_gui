import _axios from './httpService'

import { useAuth } from '../context/AuthContext'

const AuthService = () => {

    const { local_logout } = useAuth();

    const login = async (username, password) => {

        let code = 401

        try {
            const response = await _axios.post('/login', {}, { auth: { username: username, password: password } })
            if (response.status === 200) {
                code = 200
            }
        } catch (error) {
            // console.log(error.response)
            try {
                code = error.response.status
            } catch {
                code = 502
            }
            local_logout()
            // console.log(error.response.data.error)
        }

        return code
    };

    const get_login = async () => {
        try {
            const response = await _axios.get('/get_login')
            return response.status
        } catch (error) {
            local_logout()
            return 401
        }
    };

    const logout = async () => {

        try {
            await _axios.post('/logout')
        } catch (e) {
            // Error here doesn't matter, force local logout
            local_logout()
        }
    }

    const demoLogin = async () => {
        const errorResponse = { username: "An Error Occured", password: "" }
        try {
            const response = await _axios.post('/demo_login')
            return response.data
        } catch (e) {
            return errorResponse

        }
    }

    return { login, get_login, logout, demoLogin }
}

export default AuthService;
