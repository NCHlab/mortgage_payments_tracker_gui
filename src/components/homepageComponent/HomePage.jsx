import React from 'react'
import { Grid, Container, Typography, Card, CardHeader, IconButton, CardContent } from '@mui/material';


const HomePageT = () => {
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
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} key="note.id2">
                    <Card elevation={12}>
                        <CardHeader title="Mortgage Information" />
                        <CardContent>
                            <Typography variant="body2" color="textPrimary">
                                Mortgate Provider:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Total Loan:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Mortgage Outstanding:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Interest Rate:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Last Updated:
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                                Pay Mortgage:
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} key="note.id2">
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

                <Grid item xs={12} md={6} key="note.id2">
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
