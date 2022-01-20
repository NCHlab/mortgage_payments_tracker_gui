import { useEffect } from 'react';

import { COLUMNS } from '../generic/HomeImprovementColumns'
import CoreLogic from '../coreComponent/CoreLogic'

const initialValues = {
    id: -1,
    paid: '',
    reason: '',
    date: new Date().toISOString(),
    chargeable: '',
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
        sleep
    } = CoreLogic();

    useEffect(() => {
        (async () => {
            await manageGetInfo('home_improvements')
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
                chargeable: '',
            })
        } else {
            setValues({
                id: -1,
                paid: '',
                reason: '',
                date: new Date().toISOString(),
                chargeable: '',
            })
        }
    }

    const handleAddNew = () => {
        // Need to reset data incase user tried edit then add new
        resetValues(initialValues)
        manageAddNew()
    }

    const handleDelete = async () => {
        await manageDelete('home_improvements')
    }

    const handleAddPayment = async () => {
        await manageAddPayment('home_improvements', 'Home Improvement Payment')
    }

    const handleUpdate = async () => {
        await manageUpdatePayment('home_improvements', 'Home Improvement Payment')
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

    const SXValuesTableHead = {
        borderBottom: 'solid 5px #3dff7e',
        background: '#128500',
        // background: 'linear-gradient(to right, #000080, #0000a8)',
        color: 'white',
        fontWeight: 'bold'
    }

    const SXValuesTableBody = (i) => {

        return {
            width: '200px',
            padding: '5px',
            // border: 'solid 1px gray',
            borderLeft: '1px dotted #000',
            backgroundColor: isEven(i) ? '#ffffff' : '#ededed',
            '&:hover': {
                backgroundColor: '#fffbf2',
            }
        }
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
        SXValuesTableHead,
        SXValuesTableBody
    }
}

export default useOverPayments
