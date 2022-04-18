import { useEffect } from 'react';

import { COLUMNS } from '../tableComponent/columns/OtherPaymentColumns'
import CoreLogic from '../coreComponent/CoreLogic'

const useAllOtherPayments = () => {

    const {
        tableData,
        isEven,
        handleDownload,
        notify,
        setNotify,
        manageGetInfo,
        SXValuesTableBody,
        SXValuesTableHeadTheme,
        handleSelectedRows
    } = CoreLogic();

    useEffect(() => {
        (async () => {
            await manageGetInfo('other_payments/all')
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        tableData,
        COLUMNS,
        isEven,
        handleDownload,
        notify,
        setNotify,
        SXValuesTableHead: SXValuesTableHeadTheme.other_payments,
        SXValuesTableBody,
        handleSelectedRows
    }
}

export default useAllOtherPayments
