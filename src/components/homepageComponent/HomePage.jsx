import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, Button, Container, Typography, Card, CardHeader, IconButton, CardContent } from '@mui/material';

import { parseISO } from 'date-fns'
import useHomePage from './useHomePage'

const HomePageT = () => {

    const { getMortgageInfo, mortgageData } = useHomePage();

    useEffect(() => {
        getMortgageInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Grid container
                spacing={5}
                direction="row"
                alignItems="center"
                sx={{ marginTop: '20vh' }}

            >
                <Grid item xs={12} md={6} key="note.id">
                    <Card elevation={12}>
                        <CardHeader title="User Information" />
                        <CardContent>
                            <Typography variant="body2" color="textPrimary">
                                Username:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Current IP:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Current Location:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                <Button onClick={() => getMortgageInfo()}>CLICKMEEEE</Button>
                            </Typography>


                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} key="note.id2">
                    <Card elevation={12}>
                        <CardHeader title="Mortgage Information" />
                        <CardContent>
                            <Typography variant="body2" color="textPrimary">
                                Mortgage Provider: {mortgageData.provider}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Total Loan: {mortgageData.loan}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Mortgage Outstanding: {mortgageData.balance}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Interest Rate Period: {mortgageData.period} Yrs @ {mortgageData.interest_rate}% Fixed
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Dates: {mortgageData.start_period} - {mortgageData.start_period + mortgageData.period}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Last Updated: {parseISO(mortgageData.date_updated).toString()}
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} key="note.id3">
                    <Card elevation={12}>
                        <CardHeader title="Your Payments" />
                        <CardContent>
                            <Typography variant="body2" color="textPrimary">
                                Payments:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Overpayments:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Home Improvements:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Total:
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} key="note.id4">
                    <Card elevation={12}>
                        <CardHeader title="User" />
                        <CardContent>
                            <Typography variant="body2" color="textPrimary">
                                TEST1
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                TEST1
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>
    )
}

export default HomePageT
