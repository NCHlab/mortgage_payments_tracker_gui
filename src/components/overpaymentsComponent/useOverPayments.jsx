import { useEffect } from 'react';

import { COLUMNS } from '../tableComponent/columns/OverPaymentsColumns'
import CoreLogic from '../coreComponent/CoreLogic'

const initialValues = {
    id: -1,
    paid: '',
    reason: '',
    date: new Date().toISOString(),
}

const useOverPayments = () => {

    const { tableData,
        values,
        setValues,
        isEditMode,
        openPopup,
        setOpenPopup,
        enableEditing,
        handleEnableEditing,
        handleEditing,
        isEven,
        handleDownload,
        deletePopup,
        handleOpenDeletePopup,
        handleCloseDeletePopup,
        dataToDelete,
        notify,
        setNotify,
        loading,
        setLoading,
        resetValues,
        manageAddNew,
        fetchNewData,
        manageDelete,
        manageAddPayment,
        manageUpdatePayment,
        manageGetInfo,
        sleep,
        SXValuesTableBody,
        SXValuesTableHeadTheme
    } = CoreLogic();

    useEffect(() => {
        (async () => {
            await manageGetInfo('overpayments')
        })();

        setValues(initialValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData])

    const handleClearForm = () => {
        if (isEditMode) {
            setValues({
                ...values,
                paid: '',
                reason: '',
                date: new Date().toISOString(),
            })
        } else {
            setValues({
                id: -1,
                paid: '',
                reason: '',
                date: new Date().toISOString(),
            })
        }
    }

    const handleAddNew = () => {
        // Need to reset data incase user tried edit then add new
        resetValues(initialValues)
        manageAddNew()
    }

    const handleDelete = async () => {
        await manageDelete('overpayments')
    }

    const handleAddPayment = async () => {
        await manageAddPayment('overpayments', 'Over Payment')
    }

    const handleUpdate = async () => {
        await manageUpdatePayment('overpayments', 'Over Payment')
    }

    const handleSubmit = async (event) => {

        event.preventDefault()
        setLoading(true)
        await sleep(750);

        if (typeof (values.date) !== "string") {
            return
        }

        if (isEditMode === false) {
            handleAddPayment()
        } else {
            handleUpdate()
        }

        setLoading(false)
        setOpenPopup(false)
    }

    return {
        tableData,
        COLUMNS,
        values,
        setValues,
        isEditMode,
        handleSubmit,
        openPopup,
        setOpenPopup,
        enableEditing,
        handleEnableEditing,
        handleEditing,
        handleAddNew,
        isEven,
        handleDownload,
        deletePopup,
        handleOpenDeletePopup,
        handleCloseDeletePopup,
        dataToDelete,
        handleDelete,
        notify,
        setNotify,
        loading,
        handleClearForm,
        SXValuesTableHead: SXValuesTableHeadTheme.overpayments,
        SXValuesTableBody
    }
}

export default useOverPayments
