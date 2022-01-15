import React from 'react'
import { useState, useEffect } from 'react';
import PaymentsService from '../../services/PaymentsService'
import DownloaderService from '../../services/DownloaderService';
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
    const [deletePopup, setDeletePopup] = useState(false)
    const [dataToDelete, setDataToDelete] = useState({})
    const [notify, setNotify] = useState({ isOpen: false, title: '', subTitle: '' })
    const [loading, setLoading] = React.useState(false);

    const { UserPaymentInfo, AddPayment, UpdatePayment, DeletePayment } = PaymentsService()

    const { DownloadXLSX } = DownloaderService();

    useEffect(() => {
        (async () => {
            const { data } = await UserPaymentInfo()
            setTableData(data)
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNewData])

    const isEven = (idx) => idx % 2 === 0;

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
        setValues(initialValues)

        setIsEditMode(false)
        setOpenPopup(true)
    }

    const handleDownload = async (type, page) => {

        if (type === "XLSX") {
            await DownloadXLSX(page)

        }
        console.log(type)
    }

    const handleDelete = async () => {

        console.log(dataToDelete)
        setLoading(true)
        await sleep(750);

        const { code, respData } = await DeletePayment(dataToDelete.id)

        if (code === 204) {
            setfetchNewData(prev => !prev)

            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })
        } else {

            setNotify({
                isOpen: true,
                message: `Could Not Delete. Code: ${code}, Message: ${respData.message}`,
                type: 'Warning'
            })

        }

        handleCloseDeletePopup()
        setLoading(false)

        // setDeletePopup(false)
    }

    const handleCloseDeletePopup = () => {
        setDeletePopup(false)
    }



    const handleOpenDeletePopup = (data) => {
        setDataToDelete(data)
        setDeletePopup(true)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    const handleAddPayment = async () => {

        values.paid = parseFloat(values.paid)

        const { code, respData } = await AddPayment(values)

        if (code === 201) {
            const newData = [...tableData, respData]
            setTableData(newData)

            setNotify({
                isOpen: true,
                message: 'Payment Added Successfully',
                type: 'success'
            })
        } else {
            // An Error occured when contacting API
            setNotify({
                isOpen: true,
                message: `Adding Payment Failed Code: ${code}, Message: ${respData.message}`,
                type: 'error'
            })
        }
    }


    const handleUpdate = async () => {

        values.paid = parseFloat(values.paid)

        const { code, respData } = await UpdatePayment(values)

        if (code === 204) {
            // Fetch New Data to update table
            setfetchNewData(prev => !prev)

            setNotify({
                isOpen: true,
                message: 'Payment Updated Successfully',
                type: 'success'
            })
        } else {
            // An Error occured when contacting API
            setNotify({
                isOpen: true,
                message: `Updating Payment Failed Code: ${code}, Message: ${respData.message} `,
                type: 'error'
            })
        }
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
            // setfetchNewData(prev => !prev)
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
        loading
    }
}

export default usePayments
