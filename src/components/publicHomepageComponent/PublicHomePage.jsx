import React, { useState } from 'react';
import logo from './Logo_transparent.png'

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
    TableRow,
    Box,
    CardMedia,
    CardActions,
    TextField
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import usePublicHomePage from './usePublicHomePage';


const CustomSpan = styled('span')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: '20px',
    color: '#730000'
}));


const PublicHomePage = () => {

    const { handleShowDemo,
        handleCodeCheck,
        generateUserCode,
        setUserValue,
        showDemoCard,
        userCode,
        isError,
        loading,
        userValue,
        genCodeLoading
    } = usePublicHomePage();


    return (

        <Container>
            <Grid container
                spacing={5}
                direction="column"
                alignItems="center"
                justifyContent="center"
                mt='10vh'
            // sx={{ border: '1px solid black' }}
            >

                {/* <Grid item xs={12} md={12}>
                    <img src={logo} height='200px' width='600px' />
                </Grid> */}
                {/* 
                <Grid item xs={12} md={12}>

                    <Box
                        component="img"
                        sx={{
                            maxHeight: { xs: 150, md: 200, lg: 250 },
                            maxWidth: { xs: 350, md: 500, lg: 600 },
                        }}
                        alt="Mortgage Payments Tracker Logo"
                        src={logo}
                    />

                </Grid> */}


                <Grid item xs={12} md={12}>
                    <Card sx={{
                        minHeight: { xs: 150, md: 200, lg: 250 },
                        maxWidth: { xs: 350, md: 500, lg: 600 }
                    }}
                        elevation={14}>
                        <CardMedia
                            component="img"
                            sx={{
                                // maxHeight: { xs: 150, md: 200, lg: 250 },
                                // maxWidth: { xs: 350, md: 500, lg: 600 },
                                backgroundColor: '#ededed'
                            }}
                            image={logo}
                            alt="logooo"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Welcome
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Welcome to the Mortgage Payments Tracker (MPT).
                                <br />
                                This is a private website intended for personal use.
                            </Typography>
                            <br />
                            <Typography variant="body2" color="text.secondary">
                                To Access a demo version of the site, click request access below and
                                enter in the code.
                                <br />
                                Alternatively, view the gallery page for images
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleShowDemo} size="small">{!showDemoCard ? "Request Access" : "Hide Demo Card"}</Button>
                        </CardActions>
                    </Card>
                </Grid>

                {showDemoCard && (
                    <Grid item xs={12} md={12}>
                        <Card sx={{
                            minHeight: { xs: 150, md: 200, lg: 250 },
                            minWidth: { xs: 350, md: 500, lg: 600 },
                            maxWidth: { xs: 350, md: 500, lg: 600 }
                        }} elevation={14}>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Demo Login
                                </Typography>
                                <Typography sx={{ mb: 2 }} variant="body2" color="text.secondary">
                                    Misuse of this website will be considered as malicious.
                                    Your IP will be logged.
                                </Typography>

                                <Typography variant="h6" gutterBottom component="div">
                                    Enter Verification Code:
                                    <CustomSpan>{userCode}</CustomSpan>
                                </Typography>

                                <Typography sx={{ mt: 0, pt: 0 }} color="text.primary">
                                    <LoadingButton
                                        onClick={generateUserCode}
                                        type="submit"
                                        loading={genCodeLoading}
                                        variant="contained"
                                        color="secondary"
                                        sx={!genCodeLoading ? ({
                                            width: '150px',
                                            mt: 0,
                                            mb: 2,

                                            fontWeight: "bold",
                                            background: 'linear-gradient(to right top, #0a0303, #535353)',
                                            color: "white",
                                            ':hover': {
                                                background: 'linear-gradient(to left top, #730000, #000000)',
                                                color: '#ffffff',
                                            }
                                        }) : {
                                            width: '150px',
                                            mt: 0,
                                            mb: 2,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Generate Code
                                    </LoadingButton>
                                </Typography>


                                <TextField
                                    error={isError}
                                    required
                                    sx={{ width: '262px' }}
                                    onChange={(e) => setUserValue(e.target.value.toUpperCase())}
                                    color="secondary"
                                    margin="normal"
                                    label="Verification Code"
                                    value={userValue}
                                    name="Verification"
                                    id="Verification-Code-input"
                                    onPaste={(e) => e.preventDefault()}
                                    helperText="Pasting Not Allowed"
                                />

                                <LoadingButton
                                    onClick={handleCodeCheck}
                                    type="submit"
                                    loading={loading}
                                    variant="contained"
                                    color="secondary"
                                    sx={!loading ? ({
                                        width: '150px',
                                        mt: 3,
                                        mb: 2,
                                        ml: 2,
                                        fontWeight: "bold",
                                        background: 'linear-gradient(to right top, #730000, #000000)',
                                        color: "white",
                                        ':hover': {
                                            background: 'linear-gradient(to left top, #730000, #000000)',
                                            color: '#ff3636',
                                        }
                                    }) : {
                                        width: '150px',
                                        mt: 3,
                                        mb: 2,
                                        ml: 2,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Submit
                                </LoadingButton>

                            </CardContent>
                        </Card>
                    </Grid>
                )}

            </Grid>

        </Container >
    );
};

export default PublicHomePage;

{/* <div><img src={logo} /></div> */ }