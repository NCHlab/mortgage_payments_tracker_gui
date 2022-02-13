import React from 'react'

import NumberFormat from "react-number-format";
import { Button, Grid, TextField, MenuItem } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
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

const PaymentsForm = ({ values, setValues, handleClearForm, handleSubmit, loading, isSinglePayment, isHomeImprov }) => {

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

    const maxNumberCap = 100000.00
    const minNumberCap = 0
    const maxReasonCap = 200

    const handleChange = (event, prop) => {
        if (prop === "paid") {
            if (event.target.value > maxNumberCap) {
                event.target.value = maxNumberCap
            } else if (event.target.value < 0) {
                event.target.value = minNumberCap
            }
        } else if (prop === "reason" && event.target.value.length > maxReasonCap) {
            return
        }
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleDateChange = (newDateVal) => {

        try {
            newDateVal = newDateVal.toISOString()
        } catch (error) { }

        setValues({ ...values, date: newDateVal });
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
                            label="Paid"
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

                    <Grid item xs={12} md={isSinglePayment ? 6 : isHomeImprov ? 6 : 12}>
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
                                maxDateTime={new Date()}
                                onChange={(newDateVal) => { handleDateChange(newDateVal) }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    {isSinglePayment && (

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
                    )}

                    {isHomeImprov && (

                        <Grid item xs={12} md={6}>
                            <TextField
                                sx={{ ...classes.textfields, width: '262px' }}
                                select
                                required
                                color="secondary"
                                margin="normal"
                                id="chargeable"
                                label="Chargeable"
                                value={values.chargeable}
                                onChange={(e) => { handleChange(e, "chargeable") }}
                            >

                                <MenuItem key="yesChargeable" value={true}>
                                    Yes
                                </MenuItem>
                                <MenuItem key="noChargeable" value={false}>
                                    No
                                </MenuItem>

                            </TextField>
                        </Grid>

                    )}

                    <Grid item xs={12} md={3.5}>
                        <LoadingButton
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
                                    color: '#36c9ff',
                                }
                            }) : {
                                width: '150px',
                                mt: 3,
                                mb: 2,
                                fontWeight: "bold"
                            }}
                        >
                            Submit
                        </LoadingButton>
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
