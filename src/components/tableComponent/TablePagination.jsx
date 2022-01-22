import React from 'react'

import { IconButton } from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const TablePaginationActions = props => {

    const { count, page, rowsPerPage, onPageChange } = props

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
        <div className={'classes.root'}>
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
        </div>
    )
}

export default TablePaginationActions
