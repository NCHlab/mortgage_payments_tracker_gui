import _axios from './httpService'

const AuthService = () => {

    const login = async (username, password) => {

        let code = 401

        try {
            const response = await _axios.post('/login', {}, { auth: { username: username, password: password } })
            if (response.status === 200) {
                code = 200
            }
        } catch (error) {
            console.log(error.response.data.error)
        }

        return code
    };

    const get_login = async () => {
        try {
            const response = await _axios.get('/get_login')
            console.log(response.status)
            return response.status
        } catch (error) {
            return 401
        }
    };

    const logout = async () => {

        try {
            await _axios.post('/logout')
        } catch (e) {
            // Error here doesn't matter, force local logout
        }
    }

    return { login, get_login, logout }
}

export default AuthService
