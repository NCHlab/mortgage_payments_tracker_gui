import React, { useState, useEffect } from 'react'

import { Button, Typography, Grid, TextField, MenuItem, Box, Paper, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


import NumberFormat from "react-number-format";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            isNumericString
            prefix="£"
        />
    );
});

const PaymentsForm = ({ values, setValues, isEditMode, handleSubmit }) => {

    const classes = {
        textfields: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'grey',
                },
                '&:hover fieldset': {
                    borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#6b0606',
                },
            },
        }
    }

    const handleChange = (event, prop) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleDateChange = (newDateVal) => {
        try {
            newDateVal = newDateVal.toISOString()
        } catch (error) { }

        setValues({ ...values, date: newDateVal });
    }

    const handleClearForm = () => {
        if (isEditMode) {
            setValues({
                ...values,
                paid: '',
                reason: '',
                date: new Date().toISOString(),
                from_tenant: ''
            })
        } else {
            setValues({
                id: -1,
                paid: '',
                reason: '',
                date: new Date().toISOString(),
                from_tenant: ''
            })
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={0}
                >

                    <Grid item xs={12} md={6}>
                        <TextField
                            sx={{ ...classes.textfields, width: '262px' }}
                            color="secondary"
                            margin="normal"
                            required
                            // id="paid"
                            label="Paid"
                            // name="paid"
                            autoFocus
                            onChange={(e) => { handleChange(e, "paid") }}

                            value={values.paid}
                            name="numberformat"
                            id="formatted-numberformat-input"
                            InputProps={{
                                inputComponent: NumberFormatCustom
                            }}
                        />

                    </Grid>


                    <Grid item xs={12} md={6}>
                        <TextField
                            sx={{ ...classes.textfields, width: '262px' }}
                            color="secondary"
                            margin="normal"
                            required
                            id="reason"
                            label="Reason"
                            name="reason"
                            onChange={(e) => { handleChange(e, "reason") }}
                            value={values.reason}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DateTimePicker
                                renderInput={(props) => {
                                    return <TextField
                                        sx={classes.textfields}
                                        color="secondary"
                                        id="date"
                                        margin="normal"
                                        required
                                        {...props} />
                                }}
                                label="Date"
                                value={values.date}
                                inputFormat="dd/MM/yyyy hh:mm a"
                                onChange={(newDateVal) => { handleDateChange(newDateVal) }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            sx={{ ...classes.textfields, width: '262px' }}
                            select
                            required
                            color="secondary"
                            margin="normal"
                            id="from_tenant"
                            label="From Tenant"
                            value={values.from_tenant}
                            onChange={(e) => { handleChange(e, "from_tenant") }}
                        >

                            <MenuItem key="yesTenant" value={true}>
                                Yes
                            </MenuItem>
                            <MenuItem key="noTenant" value={false}>
                                No
                            </MenuItem>

                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={3.5}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{
                                width: '150px',
                                mt: 3,
                                mb: 2,
                                fontWeight: "bold",
                                background: 'linear-gradient(to right top, #730000, #000000)',
                                color: "white",
                                ':hover': {
                                    background: 'linear-gradient(to left top, #730000, #000000)',
                                    color: '#36c9ff',
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>


                    <Grid item xs={12} md={3.5}>
                        <Button
                            onClick={handleClearForm}
                            variant="contained"
                            color="secondary"
                            sx={{
                                width: '150px',
                                mt: 3,
                                mb: 2,
                                fontWeight: "bold",
                                background: 'linear-gradient(to right top, #000000, #696969)',
                                color: "white",
                                ':hover': {
                                    background: 'linear-gradient(to left top, #000000, #696969)',
                                    color: '#ff9d9d',
                                }
                            }}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

export default PaymentsForm
