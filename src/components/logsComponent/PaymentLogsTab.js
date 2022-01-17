import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { Container, Grid, Typography, TextField } from '@mui/material';

const PaymentLogsTab = () => {

    const ALLOWED_TABLENAMES = ['payments', 'overpayments', 'home_improvements']
    const ALLOWED_STATES = ['INSERT', 'UPDATE', 'DELETE']
    const ALLOWED_EQUALITY = ['less than', 'more than']

    const [tableName, setTableName] = useState('')
    const [actionState, setActionState] = useState('')
    const [lessThan, setLessThan] = useState(true)
    const [currDate, setCurrDate] = useState(new Date().toISOString())
    const [limit, setLimit] = useState(10)


    const LimitArray = [5, 10, 20, 30, 40, 50, 100]


    const handleDateChange = (val) => {
        console.log(val)
    }

    const handleLimitChange = (e) => {
        setLimit(e.target.value)
    }

    const handleEQChange = (e) => {
        console.log(e.target.name)
        if (e.target.name === "less than") {
            setLessThan(true)
        } else {
            setLessThan(false)
        }
    }

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


    return (
        <React.Fragment>
            <Grid container
                direction="row"
                alignItems="center"
                mt='1vh'
            >


                <Grid item xs={12} md={3}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }} >
                        Table Name
                    </Typography>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        Action
                    </Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        Equality
                    </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        {'Date & Limit'}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={3}>

                    <FormGroup>
                        {ALLOWED_TABLENAMES.map((tname) => {
                            return <FormControlLabel key={tname} control={<Checkbox />} label={tname.toUpperCase()} />
                        })}
                    </FormGroup>
                </Grid>

                <Grid item xs={12} md={2}>

                    <FormGroup>
                        {ALLOWED_STATES.map((state) => {
                            return <FormControlLabel key={state} control={<Checkbox />} label={state} />
                        })}
                    </FormGroup>
                </Grid>

                <Grid item xs={12} md={3}>

                    <FormGroup>
                        {/* {ALLOWED_EQUALITY.map((value) => {
                            return (
                                <FormControlLabel key={value}
                                    control={
                                        <Checkbox checked={lessThan} onChange={handleEQChange} name={value} />}
                                    label={value.toUpperCase()} />
                            )


                        })} */}
                        <FormControlLabel
                            control={
                                <Checkbox checked={lessThan === true} onChange={handleEQChange} name={'less than'} />}
                            label={'less than'.toUpperCase()} />

                        <FormControlLabel
                            control={
                                <Checkbox checked={lessThan === false} onChange={handleEQChange} name={'more than'} />}
                            label={'more than'.toUpperCase()} />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} md={3}>
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
                            value={currDate}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            onChange={(newDateVal) => { handleDateChange(newDateVal) }}
                        />
                    </LocalizationProvider>


                    <InputLabel id="limit-select-label">Limit</InputLabel>
                    <Select
                        labelId="limit-select-label"
                        id="limit-select"
                        value={limit}
                        label="Limit"
                        onChange={handleLimitChange}
                    >

                        {LimitArray.map((num) => <MenuItem key={num} value={num}>{num}</MenuItem>)}


                    </Select>

                </Grid>


            </Grid>
        </React.Fragment >

    )
}

export default PaymentLogsTab
