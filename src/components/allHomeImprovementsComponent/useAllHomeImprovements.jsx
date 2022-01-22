import { useEffect } from 'react';

import { COLUMNS } from '../tableComponent/columns/HomeImprovementColumns'
import CoreLogic from '../coreComponent/CoreLogic'

const useAllHomeImprovements = () => {

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
            await manageGetInfo('home_improvements/all')
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
        SXValuesTableHead: SXValuesTableHeadTheme.home_improvements,
        SXValuesTableBody,
        handleSelectedRows
    }
}

export default useAllHomeImprovements
