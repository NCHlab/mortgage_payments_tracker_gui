import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Button, Container, Typography, Card, CardHeader, IconButton, CardContent, Link } from '@mui/material';

import { parseISO } from 'date-fns'
import useHomePage from './useHomePage'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const HomePageT = () => {
    const { getMortgageInfo, mortgageData, numberFormat, getGenInfo, userData, user, refreshInfo, isRefreshed, getUserPaymentInfo, paymentData } = useHomePage();

    useEffect(() => {
        getMortgageInfo()
        getGenInfo()
        getUserPaymentInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Grid container
                spacing={5}
                direction="row"
                alignItems="center"
                mt='20vh'
            >
                <Grid item xs={12} md={6} key="note.id">
                    <Card elevation={12} sx={{ height: '290px' }}>
                        <CardHeader title="User Information" />
                        <CardContent>

                            <TableContainer >
                                <Table size="small" aria-label="simple table">
                                    <TableBody>
                                        <TableRow key="username">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Username:
                                            </TableCell>
                                            <TableCell align="left">
                                                {user[0].toUpperCase() + user.slice(1)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="currip">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Current IP:
                                            </TableCell>
                                            <TableCell align="left">
                                                {userData.IPv4}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="currloc">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Current Location:
                                            </TableCell>
                                            <TableCell align="left">
                                                {userData.country_name}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="buttrefresh" sx={{ p: 0, '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography color="textSecondary">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => refreshInfo()}
                                                        sx={{
                                                            my: 2, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                                                            ':hover': {
                                                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                                                color: 'white',
                                                                border: '2px solid #000000'
                                                            }
                                                        }}>Refresh Data</Button>

                                                </Typography>
                                                <Typography color="#00a300">
                                                    {isRefreshed && ("Data Refreshed!")}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} md={6} key="note.id4">
                    <Card elevation={12} sx={{ height: '290px' }}>
                        <CardHeader title="Mortgage Information" />
                        <CardContent>
                            <TableContainer >
                                <Table size="small" aria-label="simple table">
                                    <TableBody>
                                        <TableRow key="mprovider">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Mortgage Provider
                                            </TableCell>
                                            <TableCell align="left">
                                                {mortgageData.provider}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="tloan">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Total Loan
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(mortgageData.loan)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="mbalance">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Mortgage Outsanding
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(mortgageData.balance)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="intrateper">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Interest Rate Period
                                            </TableCell>
                                            <TableCell align="left">
                                                {mortgageData.period} Yrs @ {mortgageData.interest_rate}% Fixed
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="mortdate">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Dates
                                            </TableCell>
                                            <TableCell align="left">
                                                {mortgageData.start_period} - {mortgageData.start_period + mortgageData.period}
                                            </TableCell>
                                        </TableRow>


                                        <TableRow key="lastupdate" sx={{ p: 0, '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Last Updated
                                            </TableCell>
                                            <TableCell align="left">
                                                {parseISO(mortgageData.date_updated).toString().slice(0, -22)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} md={6} key="note.id3">
                    <Card elevation={12} sx={{ height: '290px' }}>
                        <CardHeader title="Your Payments" />
                        <CardContent>
                            <TableContainer >
                                <Table size="small" aria-label="simple table">
                                    <TableBody>
                                        <TableRow key="pay">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Payments:
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(paymentData.payments)}

                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="overpay">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Overpayments:
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(paymentData.overpayments)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="homeimprov">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Home Improvements:
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(paymentData.home_improvements)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="paymtotal" sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Total
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(paymentData.payments + paymentData.overpayments + paymentData.home_improvements)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>



                <Grid item xs={12} md={6} key="note.id2">
                    <Card elevation={12} sx={{ height: '290px' }}>
                        <CardHeader title="General Information" />
                        <CardContent>
                            <TableContainer >
                                <Table size="small" aria-label="simple table">
                                    <TableBody>
                                        <TableRow key="MortgageBroker">
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Mortgage Broker:
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: '80px' }}>
                                                {process.env.REACT_APP_BROKER}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link target="_blank" href={process.env.REACT_APP_BROKER_LINK}><ArrowCircleRightIcon sx={{ color: "#902424" }} /></Link>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="solicitor">
                                            <TableCell >
                                                Solicitor:
                                            </TableCell>
                                            <TableCell align="left">
                                                {process.env.REACT_APP_SOLICITOR}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link target="_blank" href={process.env.REACT_APP_SOLICITOR_LINK}><ArrowCircleRightIcon sx={{ color: "#902424" }} /></Link>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="estateagent">
                                            <TableCell >
                                                Estate Agents:
                                            </TableCell>
                                            <TableCell align="left">
                                                {process.env.REACT_APP_ESTATE_AGENT}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link target="_blank" href={process.env.REACT_APP_ESTATE_AGENT_LINK}><ArrowCircleRightIcon sx={{ color: "#902424" }} /></Link>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </CardContent>
                    </Card>
                </Grid>


            </Grid>
        </Container>
    )
}

export default HomePageT
