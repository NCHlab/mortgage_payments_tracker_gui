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



const Payments = () => {

    const { tableData, COLUMNS } = usePayments();
    const [disableEditing, setDisableEditing] = useState(true)

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
        setDisableEditing(prevVal => !prevVal)
        console.log(disableEditing)
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const isEven = (idx) => idx % 2 === 0;

    const styles = {
        tr: {
            background: "#ffffff",
            '&:hover': {
                background: "#000",
            }
        }
    };



    return (
        <Container maxWidth='lg'>
            <Grid container
                direction="row"
                alignItems="center"
                mt='5vh'
            >
                <Grid item xs={12} pb={0}>
                    <Button
                        variant="outlined"
                        onClick={() => { handleEditing() }}
                        sx={{
                            my: 2, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: 'white',
                                border: '2px solid #000000'
                            }
                        }}>{disableEditing ? "Enable Editing" : "Disable Editing"}</Button>
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
                        <TableBody>
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
                                                <TableCell {...cell.getCellProps()}
                                                    sx={{
                                                        width: '200px',
                                                        padding: '5px',
                                                        // border: 'solid 1px gray',
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
                                                padding: '5px',
                                                // border: 'solid 1px gray',
                                                background: isEven(i) ? '#ffffff' : '#ededed',
                                                '&:hover': {
                                                    backgroundColor: '#fffbf2',
                                                },
                                            }}
                                        >

                                            <Button disabled={disableEditing} onClick={() => console.log(row.values)}
                                                sx={{
                                                    my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', mr: '5px', backgroundImage: disableEditing ? 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))' : 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                                                    ':hover': {
                                                        backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                                        color: 'white',
                                                        border: '2px solid #000000'
                                                    }
                                                }}><EditIcon></EditIcon></Button>

                                            <Button disabled={disableEditing} onClick={() => console.log(row.values)}
                                                sx={{
                                                    my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', backgroundImage: disableEditing ? 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))' : 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
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

            </Grid>
        </Container >
    )
}

export default Payments
