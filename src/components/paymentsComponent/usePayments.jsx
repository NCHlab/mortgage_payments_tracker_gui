import React from 'react'
import { useState, useEffect } from 'react';
import PaymentsService from '../../services/PaymentsService'
import { COLUMNS } from '../generic/columns'

const usePayments = () => {

    const [tableData, setTableData] = useState(() => [])
    const { UserPaymentInfo } = PaymentsService()

    useEffect(() => {
        (async () => {
            const { data } = await UserPaymentInfo()
            setTableData(data)
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const data = React.useMemo(() => [{ "date": "2021-08-28T15:25:13.538667", "from_tenant": false, "id": 1, "paid": 20, "reason": "new", "user_id": "nayam" }, { "date": "2021-12-29T13:59:13.538667", "from_tenant": false, "id": 2, "paid": 150, "reason": "no", "user_id": "nayam" }, { "date": "2021-12-29T15:25:13.538667", "from_tenant": false, "id": 4, "paid": 450, "reason": "monthly entry", "user_id": "nayam" }, { "date": "2021-12-29T15:41:18.336637", "from_tenant": false, "id": 6, "paid": 450, "reason": "monthly entry", "user_id": "nayam" }, { "date": "2021-11-01T12:00:00.000000", "from_tenant": false, "id": 7, "paid": 200, "reason": "new", "user_id": "nayam" }, { "date": "2021-11-01T12:00:00.000000", "from_tenant": true, "id": 8, "paid": 99.09, "reason": "new", "user_id": "nayam" }], [])



    // useEffect(() => {
    //     (async () => {
    //       const { data } = await UserPaymentInfo("");
    //       setTableData(data);
    //     })();
    //   }, []);

    return { tableData, COLUMNS }
}

export default usePayments
