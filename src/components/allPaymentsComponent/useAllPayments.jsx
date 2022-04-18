import { useEffect } from 'react';

import { COLUMNS } from '../tableComponent/columns/PaymentsColumns'
import CoreLogic from '../coreComponent/CoreLogic'

const useAllPayments = () => {

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
            await manageGetInfo('payments/all')
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
        SXValuesTableHead: SXValuesTableHeadTheme.payments,
        SXValuesTableBody,
        handleSelectedRows
    }
}

export default useAllPayments
