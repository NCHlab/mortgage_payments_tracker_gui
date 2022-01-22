import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useRowSelect, usePagination } from 'react-table'

import { Container, Grid, Typography, TextField, Checkbox, Card, CardHeader, CardContent, Button } from '@mui/material';
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

import TablePaginationActions from '../tableComponent/TablePagination'
import TablePagination from '@mui/material/TablePagination'

import { TableRow } from '@mui/material';

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

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setPageSize(Number(event.target.value))
    }
    const customlabelDisplayedRows = ({ from, to, count }) => {
        return `Page ${pageIndex + 1} of ${pageCount}`
    }

    // function defaultlabelDisplayedRows({ from, to, count }) {
    //     return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
    // }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        page,
        footerGroups,
        prepareRow,
        selectedFlatRows,
        gotoPage,
        nextPage,
        previousPage,
        pageCount,
        pageOptions,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable({ columns, data, defaultColumn, initialState: { pageIndex: 0, pageSize: 50 } },
        useFilters,
        useGlobalFilter,
        usePagination,
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
                            page={page}
                            prepareRow={prepareRow}
                            isEven={isEven}
                            sxValues={SXValuesTableBody}
                            extraActions={false}
                        />

                        <MptTableFooter footerGroups={footerGroups} extraActions={false} >
                            <TableRow sx={{ backgroundColor: '#fff' }}>
                                <TablePagination

                                    rowsPerPageOptions={[
                                        5,
                                        25,
                                        50,
                                        100,
                                        200,
                                        { label: 'All', value: data.length },
                                    ]}
                                    colSpan={7}
                                    count={data.length}
                                    rowsPerPage={pageSize}
                                    page={pageIndex}
                                    labelDisplayedRows={customlabelDisplayedRows}
                                    nextIconButtonProps={{
                                        color: 'secondary',
                                        size: 'large'
                                    }}
                                    SelectProps={{
                                        sx: { border: '1px solid gray' },
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: false,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>


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

                {/* <Grid item xs={12}>
                    <Button onClick={() => gotoPage(0)}>First page</Button>
                    <Button onClick={previousPage}>Prev page</Button>
                    <Button onClick={nextPage}>Next page</Button>
                    <Button onClick={() => gotoPage(pageCount - 1)}>Last page</Button>
                </Grid> */}
                {/* 
                <Grid item xs={12}>
                    <TablePaginationActions
                        gotoPage={gotoPage}
                        pageCount={pageCount}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />


                </Grid> */}

                <Grid item xs={12}>
                    <Typography component='div' sx={{ color: '#c71616', fontSize: '14px' }}>

                        *Total shows all data, ignores pagination. Select Rows for specific Total
                    </Typography>
                </Grid>







            </Grid >
        </Container >
    )
};

export default AllPayments;
