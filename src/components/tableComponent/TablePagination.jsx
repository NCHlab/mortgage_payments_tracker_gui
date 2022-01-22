import React from 'react'

import { IconButton, MenuItem, Typography } from '@mui/material';
import Select from '@mui/material/Select';

import FirstPageIcon from '@mui/icons-material/FirstPage';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const TablePaginationActions = props => {

    const { count, page, rowsPerPage, onPageChange, gotoPage, pageCount, previousPage, nextPage, pageSize, setPageSize } = props

    // const handleFirstPageButtonClick = () => {
    //     gotoPage(0)
    // }

    // const handleBackButtonClick = event => {
    //     previousPage(event)
    // }

    // const handleNextButtonClick = event => {
    //     nextPage(event)
    // }

    // const handleLastPageButtonClick = event => {
    //     gotoPage(pageCount - 1)
    //     // onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    // }

    const handleFirstPageButtonClick = event => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = event => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = event => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = event => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <React.Fragment>
            {/* Rows Per Page:
            <Select
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                }}
            >

                {[5, 10, 20, 50, 100, 1000].map((pageSize) => (
                    <MenuItem key={pageSize} value={pageSize} size='small'>
                        {pageSize}
                    </MenuItem>
                    // <option key={pageSize} value={pageSize}>
                    //     Show {pageSize}
                    // </option>
                ))}
            </Select> */}

            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >

                <KeyboardArrowLeftIcon />

            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >

                <KeyboardArrowRightIcon />

            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>

            {/* <Typography component='div' sx={{ color: 'gray', width: '400px', fontSize: '10px' }}>

                *Total shows all data, ignores pagination
            </Typography> */}
        </React.Fragment>
    )
}

export default TablePaginationActions
