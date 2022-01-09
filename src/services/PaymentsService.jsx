import _axios from './httpService'

const PaymentsService = () => {

    const UserPaymentInfo = async () => {

        const date = new Date();

        let code = 401
        let data = [{ id: 1, user_id: "ERROR", paid: 0, reason: "Error Connecting To API", date: date.toISOString(), from_tenant: false }]

        try {
            const response = await _axios.get('/payments')
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

    return {
        UserPaymentInfo
    }
}

export default PaymentsService
