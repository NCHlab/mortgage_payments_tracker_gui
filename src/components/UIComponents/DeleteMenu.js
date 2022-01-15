import React, { useState } from 'react'
import { Button, Typography, Grid, TextField, MenuItem, Box, Paper, InputAdornment } from '@mui/material';
import NumberFormat from "react-number-format";
import LoadingButton from '@mui/lab/LoadingButton';

import { styled } from '@mui/material/styles';

const CustomSpan = styled('span')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: '20px',
    color: '#730000'
}));

const DeleteMenu = ({ dataToDelete, handleClose, handleDelete, loading }) => {

    const [userCode, setUserCode] = useState(Math.random().toString(36).substring(2, 7))
    const [userValue, setUserValue] = useState('')
    const [isError, setIsError] = useState(false)

    const handleCodeCheck = () => {
        if (userCode.toUpperCase() === userValue.toUpperCase()) {
            setIsError(false)
            handleDelete()
        } else {
            setIsError(true)
            setUserCode(Math.random().toString(36).substring(2, 7))
        }
    }
    return (
        <Grid
            container
            spacing={0}
        >
            {Object.entries(dataToDelete).map((data, i) => {
                const _key = data[0]
                const _value = data[1]
                return (
                    <Grid item xs={12} md={6} key={_key}>
                        <TextField
                            disabled
                            sx={{ width: '262px' }}
                            color="secondary"
                            margin="normal"
                            key={_key}
                            label={_key}
                            value={_value}
                            name="numberformat"
                            id={i.toString()}
                        />
                    </Grid>
                )
            })}


            <Grid item xs={12} sx={{ pt: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Enter Verification Code:
                    <CustomSpan>{userCode}</CustomSpan>
                </Typography>

            </Grid>


            <Grid item xs={12} md={12}>
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
                    // onPaste={(e) => e.preventDefault()}
                    helperText="Pasting Not Allowed"
                />

            </Grid>


            <Grid item xs={12} md={3.5}>
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
                        fontWeight: "bold"
                    }}
                >
                    Delete
                </LoadingButton>
            </Grid>

            <Grid item xs={12} md={3.5}>
                <Button
                    onClick={handleClose}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{
                        width: '150px',
                        mt: 3,
                        mb: 2,
                        fontWeight: "bold",
                        background: 'linear-gradient(to right top, #0a0303, #535353)',
                        color: "white",
                        ':hover': {
                            background: 'linear-gradient(to left top, #730000, #000000)',
                            color: '#ffffff',
                        }
                    }}
                >
                    Cancel
                </Button>
            </Grid>





            {/* <Grid item xs={12} md={6}>
                <TextField
                    disabled
                    sx={{ width: '262px' }}
                    color="secondary"
                    margin="normal"
                    // id="paid"
                    label="Paid"
                    value={"£" + dataToDelete.paid.toString()}
                    name="numberformat"
                    id="formatted-numberformat-input"
                />

            </Grid> */}
            {/* {JSON.stringify(dataToDelete, null, 2)} */}

        </Grid>
    )
}

export default DeleteMenu
