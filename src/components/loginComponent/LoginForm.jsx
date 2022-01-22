import React from 'react'

import { Button, Typography, Grid, TextField, Box, Paper, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import useLogin from './UseLogin'

const LoginForm = () => {

    const {
        classes, badLogin, values, handleChange, handleClickShowPassword, handleMouseDownPassword, handleSubmit,
    } = useLogin();

    return (
        <React.Fragment>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '80vh' }}
            >

                <Paper variant="elevation" elevation={24}
                    sx={{ padding: "80px 60px", border: "1px solid black" }}
                >

                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>

                        {badLogin && (
                            <Typography component="h5" variant="h7" sx={{ color: "red" }}>
                                Wrong Username and/or Password. Please Try Again.
                            </Typography>
                        )}

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                sx={classes.textfields}
                                color="secondary"
                                error={badLogin ? true : false}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Username"
                                name="username"
                                autoFocus
                                onChange={(e) => handleChange("username", e)}
                                value={values.username}
                                InputProps={{
                                    endAdornment: (
                                        <AccountCircle fontSize="large" sx={{ color: 'action.active', mr: 0.5, my: 1.5 }} />
                                    )
                                }}
                            />

                            <TextField
                                sx={classes.textfields}
                                color="secondary"
                                error={badLogin ? true : false}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={values.showPassword ? 'text' : 'password'}
                                id="password"
                                onChange={(e) => handleChange("password", e)}
                                value={values.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    fontWeight: "bold",
                                    background: 'linear-gradient(to right top, #730000, #000000)',
                                    color: "gray",
                                    ':hover': {
                                        background: 'linear-gradient(to left top, #730000, #000000)',
                                        color: 'white',
                                    }
                                }}
                            >
                                Log In
                            </Button>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </React.Fragment >
    )
}

export default LoginForm
