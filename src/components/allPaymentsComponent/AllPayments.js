import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useRowSelect } from 'react-table'

import { Container, Grid, Typography, TextField, Checkbox, Card, CardHeader, CardContent } from '@mui/material';
import { Table } from '@mui/material';

import useAllPayments from './useAllPayments'
import Controls from '../controls'
import MptTableHeadComplex from '../tableComponent/complexTable/MptTableHeadComplex'
import MptTableBodyComplex from '../tableComponent/complexTable/MptTableBodyComplex'
import MptTableFooter from '../tableComponent/MptTableFooter'

import Notification from '../UIComponents/Notification';

import '../../styles/table.css';

import { DefaultColumnFilter } from '../tableComponent/filters/DefaultFilter'
import { numberFormat } from '../generic/utils'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} />
            </>
        )
    }
)

const AllPayments = () => {


    const handleSelectedRows = (selected) => {

        let total = 0;
        selected.map(data => {
            total += data.original.paid
        })
        return numberFormat(total)
    }

    const defaultColumn = React.useMemo(
        () => ({
            // default Filter UI
            Filter: DefaultColumnFilter,
        }), [])

    const { tableData,
        COLUMNS,
        isEven,
        handleDownload,
        notify,
        setNotify,
        SXValuesTableHead,
        SXValuesTableBody
    } = useAllPayments();

    const data = React.useMemo(() => tableData, [tableData])
    const columns = React.useMemo(() => COLUMNS, [COLUMNS])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        footerGroups,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable({ columns, data, defaultColumn },
        useFilters,
        useGlobalFilter,
        useRowSelect,
        hooks => {
            hooks.allColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    width: '10px',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox.  Pagination is a problem since this will select all
                    // rows even though not all rows are on the current page.  The solution should
                    // be server side pagination.  For one, the clients should not download all
                    // rows in most cases.  The client should only download data for the current page.
                    // In that case, getToggleAllRowsSelectedProps works fine.

                    // Header: ({ getToggleAllRowsSelectedProps }) => (
                    //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} sx={{ padding: 0 }} />
                    // ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} sx={{
                            pb: 0, pt: 0, color: '#f37575a4', '&.Mui-checked': {
                                color: '#7e0505',
                            }
                        }} />
                    ),


                },
                ...columns,
            ])
        })



    return (
        <Container maxWidth='lg'>
            <Notification notify={notify} setNotify={setNotify} />



            <Grid container
                direction="row"
                alignItems="center"
                mt='5vh'
            >

                <Grid item xs={12} md={1.9} pb={0}>
                    <Controls.XLSXDownloadButton handleDownload={handleDownload} page={"all/payments"} />
                </Grid>

                <Grid item xs={12} md={1.9} pb={0}>
                    <Controls.CSVDownloadButton handleDownload={handleDownload} page={"all/payments"} />
                </Grid>

                <Grid item xs={12} pt='5px'>
                    <Table sx={{ border: '2px solid black' }} {...getTableProps()}>

                        <MptTableHeadComplex headerGroups={headerGroups} sxValues={SXValuesTableHead} />

                        <MptTableBodyComplex
                            getTableBodyProps={getTableBodyProps}
                            rows={rows}
                            prepareRow={prepareRow}
                            isEven={isEven}
                            sxValues={SXValuesTableBody}
                            extraActions={false}
                        />

                        <MptTableFooter footerGroups={footerGroups} extraActions={false} >

                        </MptTableFooter>
                    </Table>
                </Grid>

                {Object.keys(selectedRowIds).length !== 0 && (

                    <Grid item xs={12}>
                        <Card elevation={12} sx={{ height: '50px' }}>
                            <CardContent sx={{ fontWeight: 'bold' }}>
                                Total Selected: {handleSelectedRows(selectedFlatRows)}
                            </CardContent>

                        </Card>
                    </Grid>
                )}

            </Grid >
        </Container >
    )
};

export default AllPayments;
