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

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


import AddIcon from '@mui/icons-material/Add';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';


import EditForm from './EditForm'

const Payments = () => {

    const { tableData, COLUMNS } = usePayments();
    const [enableEditing, setEnableEditing] = useState(false)

    // useEffect(() => {
    //     getInfo()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const data = React.useMemo(() => tableData, [tableData])
    const columns = React.useMemo(() => COLUMNS, [COLUMNS])


    // const tableHooks = (hooks) => {
    //     hooks.visibleColumns.push((columns) => [
    //         ...columns,
    //         {
    //             id: "Modify",
    //             Header: "Modify",
    //             Cell: ({ row }) => (
    //                 <React.Fragment>
    //                     <Button disabled={false} onClick={() => console.log(row.values)}
    //                         sx={{
    //                             my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', mr: '5px', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
    //                             ':hover': {
    //                                 backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
    //                                 color: 'white',
    //                                 border: '2px solid #000000'
    //                             }
    //                         }}>Edit</Button>

    //                     <Button disabled={false} onClick={() => console.log(row.values)}
    //                         sx={{
    //                             my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
    //                             ':hover': {
    //                                 backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
    //                                 color: 'white',
    //                                 border: '2px solid #000000'
    //                             }
    //                         }}>Delete</Button>
    //                 </React.Fragment>
    //             )
    //         }
    //     ])
    // };


    const handleEditing = () => {
        // setEnableEditing(prevVal => !prevVal)

        setEnableEditing(prevVal => {
            console.log(!prevVal)
            return !prevVal
        })

    }

    const handleAddNew = () => {

    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const isEven = (idx) => idx % 2 === 0;


    return (
        <Container maxWidth='lg'>

            <EditForm />


            <Grid container
                direction="row"
                alignItems="center"
                mt='5vh'
            >

                <Grid item xs={1.4} pb={0}>
                    <Button
                        variant="outlined"
                        onClick={handleAddNew}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0, 0.8), rgba(43, 43, 43, 0.8))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: '#36c9ff',
                                border: '2px solid #000000'
                            }
                        }}><AddIcon /> Add New</Button>
                </Grid>

                <Grid item xs={2} pb={0}>
                    <Button
                        variant="outlined"
                        onClick={handleEditing}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: 'white',
                                border: '2px solid #000000'
                            }
                        }}>{enableEditing ? (<React.Fragment><ToggleOnIcon sx={{ color: "#60ff52" }} /> Edit</React.Fragment>) : (<React.Fragment><ToggleOffIcon sx={{ color: "#c70000" }} /> Edit</React.Fragment>)}
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

                                            <Button disabled={!enableEditing} onClick={() => console.log(row.values)}
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
                    </Table>
                </Grid>
            </Grid >
        </Container >
    )
}

export default Payments
