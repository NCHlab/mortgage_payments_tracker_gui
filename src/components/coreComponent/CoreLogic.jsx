import React from 'react'
import { useState } from 'react';
import PaymentsService from '../../services/PaymentsService'
import DownloaderService from '../../services/DownloaderService';

const CoreLogic = () => {

    const [tableData, setTableData] = useState(() => [])
    const [fetchNewData, setfetchNewData] = useState(false)
    const [values, setValues] = useState()
    const [isEditMode, setIsEditMode] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [enableEditing, setEnableEditing] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [dataToDelete, setDataToDelete] = useState({})
    const [notify, setNotify] = useState({ isOpen: false, title: '', subTitle: '' })
    const [loading, setLoading] = React.useState(false);

    const { UserPaymentInfo, AddPayment, UpdatePayment, DeletePayment } = PaymentsService()
    const { DownloadXLSX, DownloadCSV } = DownloaderService();


    const manageGetInfo = async (page) => {
        const { data } = await UserPaymentInfo(page)
        setTableData(data)

    }

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

    const resetValues = (data) => {
        setValues(data)
    }

    const manageAddNew = () => {
        setIsEditMode(false)
        setOpenPopup(true)
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const manageDelete = async (page) => {
        setLoading(true)
        await sleep(750);

        const { code, respData } = await DeletePayment(page, dataToDelete.id)

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
    }

    const handleCloseDeletePopup = () => {
        setDeletePopup(false)
    }

    const handleOpenDeletePopup = (data) => {
        setDataToDelete(data)
        setDeletePopup(true)
    }


    const handleDownload = async (type, page) => {

        if (type === "XLSX") {
            const response = await DownloadXLSX(page)

            if (response) {
                setNotify({
                    isOpen: true,
                    message: `Error Generating Excel file: ${response}`,
                    type: 'error'
                })
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Excel File Generated!',
                    type: 'info'
                })
            }

        } else {
            const response = await DownloadCSV(page)

            if (response) {
                setNotify({
                    isOpen: true,
                    message: `Error Generating CSV file: ${response}`,
                    type: 'error'
                })
            } else {
                setNotify({
                    isOpen: true,
                    message: 'CSV File Generated!',
                    type: 'info'
                })
            }
        }
    }

    const manageAddPayment = async (page, msg) => {
        values.paid = parseFloat(values.paid)

        const { code, respData } = await AddPayment(page, values)

        if (code === 201) {
            const newData = [...tableData, respData]
            setTableData(newData)

            setNotify({
                isOpen: true,
                message: `${msg} Added Successfully`,
                type: 'success'
            })
        } else {
            // An Error occured when contacting API
            setNotify({
                isOpen: true,
                message: `Adding ${msg} Failed Code: ${code}, Message: ${respData.message}`,
                type: 'error'
            })
        }
    }

    const manageUpdatePayment = async (page, msg) => {
        values.paid = parseFloat(values.paid)

        const { code, respData } = await UpdatePayment(page, values)

        if (code === 204) {
            // Fetch New Data to update table
            setfetchNewData(prev => !prev)

            setNotify({
                isOpen: true,
                message: `${msg} Updated Successfully`,
                type: 'success'
            })
        } else {
            // An Error occured when contacting API
            setNotify({
                isOpen: true,
                message: `Updating ${msg} Failed Code: ${code}, Message: ${respData.message} `,
                type: 'error'
            })
        }
    }


    return {
        tableData,
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
    }
}

export default CoreLogic
