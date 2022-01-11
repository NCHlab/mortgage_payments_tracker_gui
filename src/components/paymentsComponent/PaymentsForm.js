import React, { useState } from 'react'

import { Button, Typography, Grid, TextField, MenuItem, Box, Paper, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


import NumberFormat from "react-number-format";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { parse } from 'date-fns'

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

const PaymentsForm = ({ formName }) => {

    // const [paid, setPaid] = useState("")
    // const [reason, setReason] = useState("")
    // const [date, setDate] = useState("")
    // const [tenant, setTenant] = useState("")


    const [values, setValues] = useState({
        paid: '',
        reason: '',
        date: new Date().toISOString(),
        tenant: '',
    })

    // const [value, setValue] = React.useState(new Date());


    // const [number, setNumber] = React.useState(1320);



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

    const handleSubmit = (event) => {
        event.preventDefault()

        if (typeof (values.date) !== "string") {
            return
        }

        console.log(values)
        console.log(values.date)
    }


    const handleChange = (event, prop) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleDateChange = (newDateVal) => {
        try {
            newDateVal = newDateVal.toISOString()
        } catch (error) {

        }

        setValues({ ...values, date: newDateVal });

    }

    const handleClearForm = () => {
        setValues({
            paid: '',
            reason: '',
            date: new Date().toISOString(),
            tenant: '',
        })
    }

    return (
        <React.Fragment>

            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={0}
                // direction="row"
                // alignItems="center"
                // justifyContent="center"
                >

                    {/* <Paper variant="elevation" elevation={24}
                    sx={{ padding: "80px 60px", border: "1px solid black" }}
                > */}


                    {/* <Grid item xs={12}>


                        <Typography component="h1" variant="h5">
                            {formTitle}
                        </Typography>
                    </Grid> */}

                    <Grid item xs={12} md={4}>
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


                    <Grid item xs={12} md={8}>

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
                    <Grid item xs={12} md={4}>

                        {/* <TextField
                            sx={classes.textfields}
                            color="secondary"
                            margin="normal"
                            required
                            id="date"
                            label="Date"
                            name="date"
                            onChange={(e) => { handleChange(e, "date") }}
                            value={values.date}
                        /> */}

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

                    <Grid item xs={12} md={8}>


                        <TextField
                            sx={{ ...classes.textfields, width: '262px' }}
                            select
                            required
                            color="secondary"
                            margin="normal"
                            id="tenant"
                            label="From Tenant"
                            value={values.tenant}
                            onChange={(e) => { handleChange(e, "tenant") }}
                        >

                            <MenuItem key="yesTenant" value={true}>
                                Yes
                            </MenuItem>
                            <MenuItem key="noTenant" value={false}>
                                No
                            </MenuItem>

                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={2.2}>

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


                    <Grid item xs={12} md={2}>

                        <Button
                            onClick={handleClearForm}
                            // fullWidth
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

                    {/* </Paper> */}
                </Grid>
            </form>
        </React.Fragment>
    )
}

export default PaymentsForm
