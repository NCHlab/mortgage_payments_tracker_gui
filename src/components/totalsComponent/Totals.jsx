import React from 'react';

import {
    Grid,
    Button,
    Container,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';

import useTotals from './useTotals'
import { numberFormat } from '../generic/utils';
import Notification from '../UIComponents/Notification';

const Totals = () => {

    const { aggregateData, total, handleDownloadAll, notify, setNotify } = useTotals();
    return (
        <Container>
            <Notification notify={notify} setNotify={setNotify} />
            <Grid container
                spacing={5}
                direction="row"
                alignItems="center"
                mt='10vh'
            >

                <Grid item xs={12} md={6} key={"all"}>
                    <Card elevation={12} sx={{ height: '290px' }}>
                        <CardHeader title={"All Aggregated User Totals"} titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>

                            <TableContainer >
                                <Table size="small" aria-label="simple table">
                                    <TableBody>
                                        <TableRow sx={{ borderBottom: '2px dotted #7e0505' }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Payments:
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(total.payments)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow sx={{ borderBottom: '2px dotted #7e0505' }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Over Payments:
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(total.overpayments)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow sx={{ borderBottom: '2px dotted #7e0505' }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Home Improvements:
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(total.home_improvements)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow sx={{ borderBottom: '2px solid #7e0505' }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                Total:
                                            </TableCell>
                                            <TableCell align="left">
                                                {numberFormat(total.total)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow key="buttonDownload" sx={{ p: 0, '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography color="textSecondary">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={handleDownloadAll}
                                                        sx={{
                                                            my: 0, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                                                            ':hover': {
                                                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                                                color: 'white',
                                                                border: '2px solid #000000'
                                                            }
                                                        }}>Download All Data</Button>

                                                </Typography>
                                            </TableCell>
                                        </TableRow>


                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {aggregateData.map(UserObj => {
                    const username = Object.keys(UserObj)[0]
                    const userTotal = UserObj[`${username}`].payments + UserObj[`${username}`].overpayments + UserObj[`${username}`].home_improvements

                    return (
                        <Grid item xs={12} md={6} key={username}>
                            <Card elevation={12} sx={{ height: '290px' }}>
                                <CardHeader title={`Total for ${username[0].toUpperCase() + username.slice(1)}`} titleTypographyProps={{ variant: 'h6' }} />
                                <CardContent>

                                    <TableContainer >
                                        <Table size="small" aria-label="simple table">
                                            <TableBody>
                                                <TableRow key="username">
                                                    <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                        Username:
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {username[0].toUpperCase() + username.slice(1)}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow >
                                                    <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                        Payments:
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {numberFormat(UserObj[`${username}`].payments) || numberFormat(0)}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow >
                                                    <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                        Over Payments:
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {numberFormat(UserObj[`${username}`].overpayments) || numberFormat(0)}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow >
                                                    <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                        Home Improvements:
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {numberFormat(UserObj[`${username}`].home_improvements) || numberFormat(0)}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow >
                                                    <TableCell sx={{ width: '150px' }} component="th" scope="row">
                                                        Total:
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {numberFormat(userTotal)}
                                                    </TableCell>
                                                </TableRow>


                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    )

                })}


            </Grid>
        </Container>

    );
};

export default Totals;
