import axios from 'axios';
import { AXIOS_CONFIG as config } from '../config'

const getAxiosInstance = () => {

    const instance = axios.create(config);
    // instance.defaults.withCredentials = true
    return instance
}

const _axios = getAxiosInstance()

export default _axios;