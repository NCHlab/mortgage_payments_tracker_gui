import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { Grid, Typography, TextField, Button } from '@mui/material';

import LogsService from '../../services/LogsService'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const PaymentLogsTab = () => {

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

    const { GetPaymentLogs } = LogsService();

    const ALLOWED_TABLENAMES = ['payments', 'overpayments', 'home_improvements']
    const ALLOWED_STATES = ['INSERT', 'UPDATE', 'DELETE']
    const LimitArray = [1, 5, 10, 20, 30, 40, 50, 100]

    const [tableName, setTableName] = useState({
        payments: false,
        overpayments: false,
        home_improvements: false
    })

    const [actionState, setActionState] = useState({
        INSERT: false,
        UPDATE: false,
        DELETE: false
    })

    const [lessThan, setLessThan] = useState(true)
    const [currDate, setCurrDate] = useState(new Date().toISOString())
    const [limit, setLimit] = useState(5)
    const [jsonData, setJsonData] = useState({});
    const [stringifyLines, setStringifyLines] = useState(false)
    const [useDark, setUseDark] = useState(true)

    const { payments, overpayments, home_improvements } = tableName;
    const tnameError = [payments, overpayments, home_improvements].filter((v) => v).length === 0;

    const { INSERT, UPDATE, DELETE } = actionState;
    const actError = [INSERT, UPDATE, DELETE].filter((v) => v).length === 0;


    const handleTableNameChange = (event) => {
        setTableName({
            ...tableName,
            [event.target.name]: event.target.checked,
        });
    };

    const handleActionStateChange = (event) => {
        setActionState({
            ...actionState,
            [event.target.name]: event.target.checked,
        });
    };

    const handleDateChange = (newDateVal) => {
        setCurrDate(newDateVal.toISOString())
    }

    const handleLimitChange = (e) => {
        setLimit(e.target.value)
    }

    const handleEQChange = (e) => {
        if (e.target.name === "less than") {
            setLessThan(true)
        } else {
            setLessThan(false)
        }
    }

    const handleSubmitLogs = async () => {
        if (tnameError || actError) {
            return
        }

        const query = createQuery()
        const { code, respData } = await GetPaymentLogs(query)
        if (code === 200) {
            if (!stringifyLines) {
                for (const element of respData) {
                    element.log = JSON.parse(element.log)
                }
            }
        }
        setJsonData(respData)
    }

    const createQuery = () => {

        const tableNameQuery = parseQuery(tableName)
        const actionQuery = parseQuery(actionState)
        const mainQuery = `?tablename=${tableNameQuery}&state=${actionQuery}&less_than=${lessThan}&date=${currDate}&limit=${limit}`
        return mainQuery
    }

    const parseQuery = (obj) => {
        let query_str = ''

        for (const element in obj) {
            if (obj[element]) {
                if (query_str === '') {
                    query_str += element
                } else {
                    query_str += "," + element
                }
            }
        }
        return query_str
    }

    const handleStringify = () => {
        setStringifyLines(prev => !prev)
    }

    return (
        <React.Fragment>
            <Grid container
                direction="row"
                alignItems="center"
                mt='1vh'
            >


                <Grid item md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }} >
                        Table Name
                    </Typography>
                </Grid>

                <Grid item md={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        Action
                    </Typography>
                </Grid>

                <Grid item md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        Equality
                    </Typography>
                </Grid>

                <Grid item md={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        {'Date & Limit'}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={3}>

                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black', display: { xs: 'flex', md: 'none' } }} >
                        Table Name
                    </Typography>

                    <FormControl
                        required
                        error={tnameError}
                        component="fieldset"
                        variant="standard"
                    >

                        <FormGroup>
                            {ALLOWED_TABLENAMES.map((tname) => {
                                return <FormControlLabel key={tname} control={<Checkbox name={tname} checked={tableName[`${tname}`]} onChange={handleTableNameChange} />} label={tname.toUpperCase()} />
                            })}
                        </FormGroup>
                        <FormHelperText>At least 1 must be selected</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={2}>

                    <FormControl
                        required
                        error={actError}
                        component="fieldset"
                        variant="standard"
                    >

                        <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black', display: { xs: 'flex', md: 'none' } }}>
                            Action
                        </Typography>

                        <FormGroup>
                            {ALLOWED_STATES.map((state) => {
                                return <FormControlLabel key={state} control={<Checkbox name={state} checked={actionState[`${state}`]} onChange={handleActionStateChange} />} label={state} />
                            })}
                        </FormGroup>
                        <FormHelperText>At least 1 must be selected</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>

                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black', display: { xs: 'flex', md: 'none' } }}>
                        Equality
                    </Typography>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={lessThan === true} onChange={handleEQChange} name={'less than'} />}
                            label={'Before (date)'.toUpperCase()} />

                        <FormControlLabel
                            control={
                                <Checkbox checked={lessThan === false} onChange={handleEQChange} name={'more than'} />}
                            label={'After (date)'.toUpperCase()} />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black', display: { xs: 'flex', md: 'none' } }}>
                        {'Date & Limit'}
                    </Typography>
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

                <Grid item xs={12} md={3}>
                    <Button
                        disabled={tnameError || actError}
                        variant="contained"
                        onClick={handleSubmitLogs}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: tnameError || actError ? 'gray' : 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                            ':hover': {
                                backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                color: '#36c9ff',
                                border: '2px solid #000000'
                            }
                        }}> Submit
                    </Button>

                </Grid>

                <Grid item xs={12} md={5}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={stringifyLines} onChange={handleStringify} name={'LogfieldStringify'} />}
                            label={'Log field as string (reduces lines)'} />
                    </FormGroup>

                </Grid>
                <Grid item xs={12} md={4}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={useDark} onChange={() => { setUseDark(prev => !prev) }} name={'JsonDarkMode'} />}
                            label={'JSON Dark Mode'} />
                    </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>

                    <SyntaxHighlighter
                        language="json"
                        wrapLines={true}
                        style={useDark ? anOldHope : github}
                        showLineNumbers={true}
                    >
                        {JSON.stringify(jsonData, null, 2)}
                    </SyntaxHighlighter>
                </Grid>


            </Grid>
        </React.Fragment >

    )
}

export default PaymentLogsTab
