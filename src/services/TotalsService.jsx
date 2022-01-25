import _axios from './httpService'

const TotalsService = () => {

    const allUserPaymentInfo = async () => {

        const err_obj = [{
            Error: {
                payments: 0,
                overpayments: 0,
                home_improvements: 0
            }
        }]

        try {
            const response = await _axios.get('/aggregate/all')
            return response.data
        } catch (error) {
            return err_obj
        }
    }
    return { allUserPaymentInfo }
};

export default TotalsService;
