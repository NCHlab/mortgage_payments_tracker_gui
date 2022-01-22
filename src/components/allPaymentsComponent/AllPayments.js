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

// import TablePaginationActions from '../tableComponent/pagination/TablePaginationActions'
// import TablePagination from '@mui/material/TablePagination'

import EnhancedPagination from '../tableComponent/pagination/EnhancedPagination'

import { TableRow } from '@mui/material';
import CautionInfoTypography from '../generic/CautionInfoTypography'
import SelectedTotals from '../tableComponent/SelectedTotals';

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

    // const customlabelDisplayedRows = () => {
    //     return `Page ${pageIndex + 1} of ${pageCount}`
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
                                <EnhancedPagination
                                    colSpan={7}
                                    dataLength={data.length}
                                    pageSize={pageSize}
                                    pageIndex={pageIndex}
                                    gotoPage={gotoPage}
                                    setPageSize={setPageSize}
                                    pageCount={pageCount}
                                />
                            </TableRow>
                        </MptTableFooter>
                    </Table>
                </Grid>

                {Object.keys(selectedRowIds).length !== 0 && (
                    <SelectedTotals
                        handleSelectedRows={handleSelectedRows}
                        selectedFlatRows={selectedFlatRows} />
                )}

                <Grid item xs={12}>
                    <CautionInfoTypography />
                </Grid>

            </Grid >
        </Container >
    )
};

export default AllPayments;
