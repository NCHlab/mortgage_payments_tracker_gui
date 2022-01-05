
import _axios from './httpService'


import axios from 'axios';
const HomePageService = () => {

    const mortgageInfo = async () => {

        let code = 401
        let data = { "error": "Unauthorized" }

        try {
            const response = await _axios.get('/mortgage')
            if (response.status === 200) {
                code = 200
                data = response.data
            }
        } catch (error) {
            console.log(error.response.data.error)
        }

        return { code, data }
    };

    const genInfo = async () => {

        const err_obj = {
            country_name: "Connectivity to geolocation may be down",
            city: "Error",
            IPv4: "Unable to get IP"
        }

        try {
            const response = await axios.get('https://geolocation-db.com/json/')
            return response.data
        } catch (error) {
            return err_obj
        }
    }


    return { mortgageInfo, genInfo }
}

export default HomePageService






