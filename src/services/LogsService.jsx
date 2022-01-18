import _axios from './httpService'

const LogsService = () => {

    const GetPaymentLogs = async (queryString) => {

        let code
        let respData

        try {
            const response = await _axios.get(`/logs/payment${queryString}`)
            code = 200
            respData = response.data

        } catch (error) {
            code = error.response.status
            respData = { message: error.response.statusText }
        }

        return { code, respData }

    }


    const GetLoginLogs = async (queryString) => {

        let code
        let respData

        try {
            const response = await _axios.get(`/logs/login${queryString}`)
            code = 200
            respData = response.data

        } catch (error) {
            code = error.response.status
            respData = { message: error.response.statusText }
        }

        return { code, respData }

    }




    return {
        GetPaymentLogs,
        GetLoginLogs
    }
}

export default LogsService
