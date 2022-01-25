import { useState, useEffect } from 'react'

import TotalsService from '../../services/TotalsService'
import CoreLogic from '../coreComponent/CoreLogic';

const useTotals = () => {

    const { allUserPaymentInfo } = TotalsService();
    const { handleDownload, validateLoggedIn, notify, setNotify } = CoreLogic();


    const [aggregateData, setAggregateData] = useState([])
    const [total, setTotal] = useState({ payments: 0, overpayments: 0, home_improvements: 0, total: 0 })

    useEffect(() => {
        (async () => {
            const data = await allUserPaymentInfo()
            setAggregateData(data)
            calculateAllTotal(data)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getTotal = (data, objKey) => {
        return data.map(UserObj => {
            const username = Object.keys(UserObj)[0]
            return UserObj[`${username}`][`${objKey}`]
        }).reduce((acc, value) => acc + value, 0);
    }

    const calculateAllTotal = (aggregateData) => {
        const paymentsTotal = getTotal(aggregateData, 'payments')
        const overpaymentsTotal = getTotal(aggregateData, 'overpayments')
        const homeImprovementsTotal = getTotal(aggregateData, 'home_improvements')

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
        handleDownloadAll,
        notify,
        setNotify
    };
};

export default useTotals;
