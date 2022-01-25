import { useState, useEffect } from 'react'

import TotalsService from '../../services/TotalsService'
import CoreLogic from '../coreComponent/CoreLogic';

const useTotals = () => {

    const { allUserPaymentInfo } = TotalsService();
    const { handleDownload, validateLoggedIn } = CoreLogic();


    const [aggregateData, setAggregateData] = useState([])
    const [total, setTotal] = useState({ payments: 0, overpayments: 0, home_improvements: 0, total: 0 })

    useEffect(async () => {
        const data = await allUserPaymentInfo()
        setAggregateData(data)
        calculateAllTotal(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const calculateAllTotal = (aggregateData) => {

        const paymentsTotal = aggregateData.map(UserObj => {
            const username = Object.keys(UserObj)[0]
            return UserObj[`${username}`].payments
        }).reduce((acc, value) => acc + value, 0);

        const overpaymentsTotal = aggregateData.map(UserObj => {
            const username = Object.keys(UserObj)[0]
            return UserObj[`${username}`].overpayments
        }).reduce((acc, value) => acc + value, 0);

        const homeImprovementsTotal = aggregateData.map(UserObj => {
            const username = Object.keys(UserObj)[0]
            return UserObj[`${username}`].home_improvements
        }).reduce((acc, value) => acc + value, 0);

        // const paymentsTotal2 = aggregateData.map(UserObj => UserObj[`${Object.keys(UserObj)[0]}`].payments
        // ).reduce((acc, value) => acc + value, 0);

        const AllTotal = {
            payments: paymentsTotal,
            overpayments: overpaymentsTotal,
            home_improvements: homeImprovementsTotal,
            total: paymentsTotal + overpaymentsTotal + homeImprovementsTotal
        }

        setTotal(AllTotal)
    }

    const handleDownloadAll = async () => {
        const response = await handleDownload('XLSX', 'combined/all')

        const validationPass = validateLoggedIn(response)
        if (validationPass === false) return
    }


    return {
        aggregateData,
        total,
        handleDownloadAll
    };
};

export default useTotals;
