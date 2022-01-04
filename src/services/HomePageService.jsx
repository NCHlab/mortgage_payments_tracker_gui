
import _axios from './httpService'

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


    return { mortgageInfo }
}

export default HomePageService






