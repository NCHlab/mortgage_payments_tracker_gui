import { useEffect } from 'react';

import { COLUMNS } from '../tableComponent/columns/OverPaymentsColumns'
import CoreLogic from '../coreComponent/CoreLogic'

const useAllOverPayments = () => {

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
            await manageGetInfo('overpayments/all')
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
        SXValuesTableHead: SXValuesTableHeadTheme.overpayments,
        SXValuesTableBody,
        handleSelectedRows
    }
}

export default useAllOverPayments
