import _axios from './httpService'


const get_error = (error) => {
    try {
        console.log(error.response.statusText)
    } catch {
        console.log(error)
    }
}

const PaymentsService = () => {

    const UserPaymentInfo = async (endpoint) => {

        const date = new Date();

        let code = 401
        let data = [{ id: 1, user_id: "ERROR", paid: 0, reason: "Error Connecting To API", date: date.toISOString(), from_tenant: false }]

        try {
            const response = await _axios.get(`/${endpoint}`)
            if (response.status === 200) {
                code = 200
                data = response.data
            }
        } catch (error) {

            try {
                console.log(error.response.data.error)
            } catch {
                console.log(error)
                return { code, data }
            }
        }

        return { code, data }
    };

    const AddPayment = async (endpoint, reqData) => {

        let code
        let respData

        try {
            const response = await _axios.post(`/${endpoint}`, { ...reqData })
            code = 201
            respData = response.data

        } catch (error) {
            code = error.response.status
            respData = { message: error.response.statusText }
        }

        return { code, respData }

    }


    const UpdatePayment = async (endpoint, reqData) => {
        let code
        let respData

        try {
            const response = await _axios.put(`/${endpoint}`, { ...reqData })
            code = 204
            respData = { message: response.statusText }

        } catch (error) {
            code = error.response.status
            respData = { message: error.response.statusText }
        }

        return { code, respData }

    }

    const DeletePayment = async (endpoint, id) => {

        let code
        let respData

        try {
            const response = await _axios.delete(`/${endpoint}/${id}`)
            code = 204
            respData = { message: response.statusText }

        } catch (error) {
            code = error.response.status
            respData = { message: error.response.statusText }
        }

        return { code, respData }

    }

    return {
        UserPaymentInfo,
        AddPayment,
        UpdatePayment,
        DeletePayment
    }
}

export default PaymentsService
