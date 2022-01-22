import React from 'react';

import TablePaginationActions from './TablePaginationActions'
import TablePagination from '@mui/material/TablePagination'

const EnhancedPagination = ({ colSpan, dataLength, pageSize, pageIndex, gotoPage, setPageSize, pageCount }) => {

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setPageSize(Number(event.target.value))
    }

    const customlabelDisplayedRows = () => {
        return `Page ${pageIndex + 1} of ${pageCount}`
    }
    return (
        <TablePagination

            rowsPerPageOptions={[
                5,
                25,
                50,
                100,
                200,
                { label: 'All', value: dataLength },
            ]}
            colSpan={colSpan}
            count={dataLength}
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

    );
};

export default EnhancedPagination;
