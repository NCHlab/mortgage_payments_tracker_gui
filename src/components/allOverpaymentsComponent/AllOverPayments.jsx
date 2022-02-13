import React from 'react'

import { useTable, useFilters, useGlobalFilter, useRowSelect, usePagination } from 'react-table'
import { Container, Grid } from '@mui/material';
import { Table } from '@mui/material';

import useAllOverPayments from './useAllOverPayments'
import Controls from '../controls'
import MptTableHeadComplex from '../tableComponent/complexTable/MptTableHeadComplex'
import MptTableBody from '../tableComponent/MptTableBody'
import MptTableFooter from '../tableComponent/MptTableFooter'
import Notification from '../UIComponents/Notification';
import EnhancedPagination from '../tableComponent/pagination/EnhancedPagination'
import CautionInfoTypography from '../tableComponent/CautionInfoTypography'
import SelectedTotals from '../tableComponent/SelectedTotals';
import { DefaultColumnFilter } from '../tableComponent/filters/DefaultFilter'

import '../../styles/table.css';

const AllOverPayments = () => {

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
        SXValuesTableBody,
        handleSelectedRows
    } = useAllOverPayments();

    const data = React.useMemo(() => tableData, [tableData])
    const columns = React.useMemo(() => COLUMNS, [COLUMNS])


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        footerGroups,
        prepareRow,
        selectedFlatRows,
        gotoPage,
        pageCount,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable({ columns, data, defaultColumn, initialState: { pageIndex: 0, pageSize: 50 } },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.allColumns.push(columns => [
                {
                    id: 'selection',
                    Header: () => (
                        <div>
                            Select
                        </div>
                    ),
                    width: '10px',
                    Cell: ({ row }) => (
                        <Controls.IndeterminateCheckbox {...row.getToggleRowSelectedProps()} sx={{
                            ml: '10px', pb: 0, pt: 0, color: '#f37575a4', '&.Mui-checked': {
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
                    <Controls.XLSXDownloadButton handleDownload={handleDownload} page={"all/overpayments"} />
                </Grid>

                <Grid item xs={12} md={1.9} pb={0}>
                    <Controls.CSVDownloadButton handleDownload={handleDownload} page={"all/overpayments"} />
                </Grid>

                <Grid item xs={12} pt='5px'>
                    <Table sx={{ border: '2px solid black' }} {...getTableProps()}>

                        <MptTableHeadComplex headerGroups={headerGroups} sxValues={SXValuesTableHead} />

                        <MptTableBody
                            getTableBodyProps={getTableBodyProps}
                            page={page}
                            prepareRow={prepareRow}
                            isEven={isEven}
                            sxValues={SXValuesTableBody}
                            extraActions={false}
                        />

                        <MptTableFooter footerGroups={footerGroups} extraActions={false} >
                            <EnhancedPagination
                                colSpan={7}
                                dataLength={data.length}
                                pageSize={pageSize}
                                pageIndex={pageIndex}
                                gotoPage={gotoPage}
                                setPageSize={setPageSize}
                                pageCount={pageCount}
                            />
                        </MptTableFooter>

                    </Table>
                </Grid>

                {Object.keys(selectedRowIds).length !== 0 && (
                    <SelectedTotals
                        handleSelectedRows={handleSelectedRows}
                        selectedFlatRows={selectedFlatRows} />
                )}

                <Grid item xs={12}>
                    <CautionInfoTypography extraText={"Select Rows for specific Total"} />
                </Grid>

            </Grid >
        </Container >
    )
};

export default AllOverPayments;
