import React from 'react'
import { useTable } from 'react-table'

import { Container, Grid, Typography } from '@mui/material';
import { Table } from '@mui/material';

import usePayments from './usePayments'
import PaymentsForm from '../UIComponents/PaymentsForm'
import UserDialog from '../UIComponents/UserDialog'
import Controls from '../controls'
import MptTableHead from '../tableComponent/MptTableHead'
import MptTableHeadAction from '../tableComponent/MptTableHeadAction'
import MptTableBody from '../tableComponent/MptTableBody'
import MptTableFooter from '../tableComponent/MptTableFooter'

import DeleteDialog from '../UIComponents/DeleteDialog';
import DeleteMenu from '../UIComponents/DeleteMenu';

import Notification from '../UIComponents/Notification';

const Payments = () => {

    const { tableData,
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
    } = usePayments();

    const data = React.useMemo(() => tableData, [tableData])
    const columns = React.useMemo(() => COLUMNS, [COLUMNS])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        footerGroups,
        prepareRow,
    } = useTable({ columns, data })

    const SXValuesTableHead = {
        borderBottom: 'solid 3px #970b00',
        background: '#b50d00',
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

    return (
        <Container maxWidth='lg'>
            <Notification notify={notify} setNotify={setNotify} />

            <UserDialog openPopup={openPopup} setOpenPopup={setOpenPopup} formTitle={!isEditMode ? "Add New Payment" : "Edit Payment"}>
                <PaymentsForm
                    values={values}
                    setValues={setValues}
                    isEditMode={isEditMode}
                    handleSubmit={handleSubmit}
                    loading={loading} />
            </UserDialog>

            <DeleteDialog openPopup={deletePopup} handleClose={handleCloseDeletePopup}>
                <DeleteMenu dataToDelete={dataToDelete} handleClose={handleCloseDeletePopup} handleDelete={handleDelete} loading={loading} />

            </DeleteDialog>





            <Grid container
                direction="row"
                alignItems="center"
                mt='5vh'
            >

                <Grid item xs={12} md={1} pb={0}>
                    <Controls.NewButton handleAddNew={handleAddNew} />
                </Grid>

                <Grid item xs={12} md={1} pb={0}>
                    <Controls.EnableEditButton handleEnableEditing={handleEnableEditing} enableEditing={enableEditing} />
                </Grid>

                <Grid item xs={12} md={1.9} pb={0}>
                    <Controls.XLSXDownloadButton handleDownload={handleDownload} page={"payments"} />
                </Grid>

                <Grid item xs={12} md={1.9} pb={0}>
                    <Controls.CSVDownloadButton handleDownload={handleDownload} page={"payments"} />
                </Grid>

                <Grid item xs={12} pt='5px'>
                    <Table sx={{ border: '2px solid black' }} {...getTableProps()}>

                        <MptTableHead headerGroups={headerGroups} sxValues={SXValuesTableHead}>
                            <MptTableHeadAction sxValues={SXValuesTableHead} />
                        </MptTableHead>

                        <MptTableBody
                            getTableBodyProps={getTableBodyProps}
                            rows={rows}
                            prepareRow={prepareRow}
                            isEven={isEven}
                            sxValues={SXValuesTableBody}
                            enableEditing={enableEditing}
                            handleEditing={handleEditing}
                            handleOpenDeletePopup={handleOpenDeletePopup}
                            extraActions={true}
                        />

                        <MptTableFooter footerGroups={footerGroups} extraActions={true} />
                    </Table>
                </Grid>

            </Grid >

        </Container >
    )
}

export default Payments
