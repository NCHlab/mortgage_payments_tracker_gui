import React, { useState, useEffect } from 'react'
import { useTable } from 'react-table'

import usePayments from './usePayments'

import { Button, Container, Grid, Typography, Toolbar, AppBar, Box, Menu, MenuItem, Link } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { CssBaseline } from '@mui/material';
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableFooter } from '@mui/material';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


import AddIcon from '@mui/icons-material/Add';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import PaymentsForm from './PaymentsForm'
import UserDialog from './UserDialog'

const Payments = () => {

    const { tableData, COLUMNS, values, setValues, isEditMode, setIsEditMode, handleSubmit, initialValues } = usePayments();
    const [enableEditing, setEnableEditing] = useState(false)

    const [openPopup, setOpenPopup] = useState(false)

    // useEffect(() => {
    //     getInfo()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const data = React.useMemo(() => tableData, [tableData])
    const columns = React.useMemo(() => COLUMNS, [COLUMNS])



    const handleEnableEditing = () => {
        setEnableEditing(prevVal => {
            return !prevVal
        })
    }

    const handleEditing = (data) => {
        // setEnableEditing(prevVal => !prevVal)

        console.log(data)

        setValues({ ...data })

        setIsEditMode(true)
        setOpenPopup(true)

    }

    const handleAddNew = () => {
        // Need to reset data incase user tried edit then add new

        if (values.id !== -1) {
            setValues(initialValues)
        }
        // 
        setIsEditMode(false)
        setOpenPopup(true)
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        footerGroups,
        prepareRow,
    } = useTable({ columns, data })

    const isEven = (idx) => idx % 2 === 0;


    return (
        <Container maxWidth='lg'>

            {/* <EditForm formName="Payment" /> */}

            {/* <Button onClick={() => { setOpenPopup(true) }}>OPEN DIALOG</Button> */}

            <UserDialog openPopup={openPopup} setOpenPopup={setOpenPopup} formTitle={!isEditMode ? "Add New Payment" : "Edit Payment"}>
                <PaymentsForm
                    values={values}
                    setValues={setValues}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    handleSubmit={handleSubmit} />

            </UserDialog>


            <Grid container
                direction="row"
                alignItems="center"
                mt='5vh'
            >

                <Grid item xs={12}>
                    <Typography>Payments</Typography>

                </Grid>

                <Grid item xs={12} md={1} pb={0}>
                    <Button
                        variant="outlined"
                        onClick={handleAddNew}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: '#36c9ff',
                                border: '2px solid #000000'
                            }
                        }}><AddIcon />New</Button>
                </Grid>

                <Grid item xs={12} md={1} pb={0}>
                    <Button
                        variant="outlined"
                        onClick={handleEnableEditing}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: 'white',
                                border: '2px solid #000000'
                            }
                        }}>{enableEditing ? (<React.Fragment><ToggleOnIcon sx={{ color: "#00ba1f" }} /> Edit</React.Fragment>) : (<React.Fragment><ToggleOffIcon sx={{ color: "#c70000" }} /> Edit</React.Fragment>)}
                    </Button>
                </Grid>

                <Grid item xs={12} md={1.9} pb={0}>
                    <Button
                        variant="outlined"
                        onClick={() => { }}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: '#36c9ff',
                                border: '2px solid #000000'
                            }
                        }}> <DownloadOutlinedIcon />XLSX Download
                    </Button>
                </Grid>

                <Grid item xs={12} md={1.9} pb={0}>
                    <Button
                        variant="outlined"
                        onClick={() => { }}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: '#36c9ff',
                                border: '2px solid #000000'
                            }
                        }}> <DownloadOutlinedIcon />CSV Download
                    </Button>
                </Grid>







                <Grid item xs={12} pt='5px'>
                    <Table sx={{ border: '2px solid black' }} {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map(headerGroup => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <TableCell {...column.getHeaderProps()}
                                            align="center"
                                            sx={{
                                                borderBottom: 'solid 3px #970b00',
                                                background: '#b50d00',
                                                color: 'white',
                                                fontWeight: 'bold',
                                            }}>
                                            {column.render('Header')}
                                        </TableCell>
                                    ))}

                                    <TableCell
                                        align="center"
                                        sx={{
                                            borderBottom: 'solid 3px #970b00',
                                            background: '#b50d00',
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <TableRow {...row.getRowProps()}
                                        sx={{
                                            '&:hover': {
                                                border: '2px solid #878787'
                                            }
                                        }}>
                                        {row.cells.map(cell => {
                                            return (
                                                <TableCell {...cell.getCellProps({
                                                    style: {
                                                        width: cell.column.width || 300,
                                                    },
                                                })}
                                                    sx={{
                                                        width: '200px',
                                                        padding: '5px',
                                                        // border: 'solid 1px gray',
                                                        borderLeft: '1px dotted #000',
                                                        backgroundColor: isEven(i) ? '#ffffff' : '#ededed',
                                                        '&:hover': {
                                                            backgroundColor: '#fffbf2',
                                                        },
                                                    }}>
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            )
                                        })}

                                        <TableCell
                                            sx={{
                                                width: '200px',
                                                pl: '20px',
                                                pr: '0px',
                                                pb: '5px',
                                                pt: '5px',
                                                // border: 'solid 1px gray',
                                                background: isEven(i) ? '#ffffff' : '#ededed',
                                                borderLeft: '1px dotted #000',
                                                '&:hover': {
                                                    backgroundColor: '#fffbf2',
                                                },
                                            }}
                                        >

                                            <Button disabled={!enableEditing} onClick={() => handleEditing(row.values)}
                                                sx={{
                                                    my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', mr: '5px', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                                                    ':hover': {
                                                        backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                                        color: 'white',
                                                        border: '2px solid #000000'
                                                    }
                                                }}><EditIcon></EditIcon></Button>

                                            <Button disabled={!enableEditing} onClick={() => console.log(row.values)}
                                                sx={{
                                                    my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                                                    ':hover': {
                                                        backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                                        color: 'white',
                                                        border: '2px solid #000000'
                                                    }
                                                }}><DeleteIcon></DeleteIcon></Button>
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <TableFooter >
                            {footerGroups.map((group, i) => (
                                <TableRow {...group.getFooterGroupProps()}>
                                    {group.headers.map(column => (
                                        <TableCell
                                            sx={{
                                                pl: '0px',
                                                pr: '0px',
                                                pb: '5px',
                                                pt: '5px',
                                                fontSize: '15px',
                                                color: 'black',
                                                fontWeight: 'bold',
                                                // border: 'solid 1px gray',
                                                background: '#ffffff',
                                                borderLeft: '1px dotted #000',

                                            }}
                                            {...column.getFooterProps()}>{column.render('Footer')}</TableCell>
                                    ))}
                                    <TableCell
                                        sx={{
                                            background: '#ffffff',
                                            borderLeft: '1px dotted #000'

                                        }}
                                    >




                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableFooter>
                    </Table>
                </Grid>
            </Grid >
        </Container >
    )
}

export default Payments
