import React, { useState } from 'react'

import {
    Grid, Typography, TextField, Button, FormGroup, FormControlLabel,
    Checkbox, Select, MenuItem, InputLabel
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope, github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import LogsService from '../../services/LogsService'

const LoginLogsTab = () => {

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

    const { GetLoginLogs } = LogsService();

    const LimitArray = [1, 5, 10, 20, 30, 40, 50, 100]
    const [lessThan, setLessThan] = useState(true)
    const [currDate, setCurrDate] = useState(new Date().toISOString())
    const [limit, setLimit] = useState(5)
    const [jsonData, setJsonData] = useState({});
    const [stringifyLines, setStringifyLines] = useState(true)
    const [useDark, setUseDark] = useState(true)

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
        const query = createQuery()
        const { code, respData } = await GetLoginLogs(query)

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
        const mainQuery = `?less_than=${lessThan}&date=${currDate}&limit=${limit}`
        return mainQuery
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
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        Equality
                    </Typography>
                </Grid>

                <Grid item md={9} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Typography variant='h6' component='div' sx={{ borderBottom: '1px solid black' }}>
                        {'Date & Limit'}
                    </Typography>
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

                <Grid item xs={12} md={9}>
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
                        variant="contained"
                        onClick={handleSubmitLogs}
                        sx={{
                            my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
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

export default LoginLogsTab
