import React from 'react'
import { useState, useEffect } from 'react';
import PaymentsService from '../../services/PaymentsService'
import { COLUMNS } from '../generic/columns'

const initialValues = {
    id: -1,
    paid: '',
    reason: '',
    date: new Date().toISOString(),
    from_tenant: '',
}


const usePayments = () => {

    const [tableData, setTableData] = useState(() => [])
    const [fetchNewData, setfetchNewData] = useState(false)
    const [values, setValues] = useState(initialValues)
    const [isEditMode, setIsEditMode] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [enableEditing, setEnableEditing] = useState(false)
    const isEven = (idx) => idx % 2 === 0;



    const { UserPaymentInfo } = PaymentsService()

    useEffect(() => {
        (async () => {
            const { data } = await UserPaymentInfo()
            setTableData(data)
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData])


    const handleEnableEditing = () => {
        setEnableEditing(prevVal => {
            return !prevVal
        })
    }

    const handleEditing = (data) => {
        setValues({ ...data })
        setIsEditMode(true)
        setOpenPopup(true)
    }


    const handleAddNew = () => {
        // Need to reset data incase user tried edit then add new
        if (values.id !== -1) {
            setValues(initialValues)
        }
        setIsEditMode(false)
        setOpenPopup(true)
    }





    const handleSubmit = (event) => {
        event.preventDefault()

        if (typeof (values.date) !== "string") {
            return
        }

        if (isEditMode === false) {


            // const lastRow = tableData[tableData.length - 1]
            const maxNumID = Math.max.apply(Math, tableData.map(function (o) { return o.id; }))

            const userValues = {
                id: maxNumID + 1,
                user_id: localStorage.getItem('username'),
                paid: parseFloat(values.paid),
                reason: values.reason,
                date: values.date,
                from_tenant: values.from_tenant
            }

            console.log(userValues)

            const newData = [...tableData, userValues]

            console.log(newData)

            // console.log(values)
            // console.log(values.date)
            // tableData.push(values)
            setTableData(newData)
            // setfetchNewData(prev => !prev)
        }
    }




    // const data = React.useMemo(() => [{ "date": "2021-08-28T15:25:13.538667", "from_tenant": false, "id": 1, "paid": 20, "reason": "new", "user_id": "nayam" }, { "date": "2021-12-29T13:59:13.538667", "from_tenant": false, "id": 2, "paid": 150, "reason": "no", "user_id": "nayam" }, { "date": "2021-12-29T15:25:13.538667", "from_tenant": false, "id": 4, "paid": 450, "reason": "monthly entry", "user_id": "nayam" }, { "date": "2021-12-29T15:41:18.336637", "from_tenant": false, "id": 6, "paid": 450, "reason": "monthly entry", "user_id": "nayam" }, { "date": "2021-11-01T12:00:00.000000", "from_tenant": false, "id": 7, "paid": 200, "reason": "new", "user_id": "nayam" }, { "date": "2021-11-01T12:00:00.000000", "from_tenant": true, "id": 8, "paid": 99.09, "reason": "new", "user_id": "nayam" }], [])



    // useEffect(() => {
    //     (async () => {
    //       const { data } = await UserPaymentInfo("");
    //       setTableData(data);
    //     })();
    //   }, []);

    return {
        tableData,
        COLUMNS,
        values,
        setValues,
        isEditMode,
        setIsEditMode,
        handleSubmit,
        initialValues,
        openPopup,
        setOpenPopup,
        enableEditing,
        setEnableEditing,
        handleEnableEditing,
        handleEditing,
        handleAddNew,
        isEven
    }
}

export default usePayments
