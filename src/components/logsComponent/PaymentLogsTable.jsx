import React, { useState } from 'react'

import { useTable } from 'react-table'
import {
    Grid, Typography, TextField, Button, FormGroup,
    FormControlLabel, FormHelperText, FormControl, Checkbox,
    Select, MenuItem, InputLabel, Table
} from '@mui/material';

import { LocalizationProvider, DateTimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import CoreLogic from '../coreComponent/CoreLogic'
import MptTableHead from '../tableComponent/MptTableHead'
import MptTableBody from '../tableComponent/MptTableBody'
import LogsService from '../../services/LogsService'
import { COLUMNS } from '../tableComponent/columns/LogsColumns'


const PaymentLogsTable = () => {

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

    const {
        isEven,
        SXValuesTableBody,
        SXValuesTableHeadTheme,
    } = CoreLogic();

    const SXValuesTableHead = SXValuesTableHeadTheme.payments;

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
    const [tableData, setTableData] = useState(() => []);


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
        let parsedTableObj = []

        if (code === 200) {
            for (const element of respData) {
                element.log = JSON.parse(element.log)

                parsedTableObj.push({
                    id: element.id,
                    user_id: element.user_id,
                    action: element.state,
                    table_name: element.table_name,
                    new_values: element.log?.new_values || {},
                    prev_values: element.log?.prev_values || {},
                    date: element.date
                })
            }
            setTableData(parsedTableObj)
        }
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


    const data = React.useMemo(() => tableData, [tableData])
    const columns = React.useMemo(() => COLUMNS, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

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


                <Grid item xs={12} pt='5px'>
                    <Table sx={{ border: '2px solid black' }} {...getTableProps()}>

                        <MptTableHead headerGroups={headerGroups} sxValues={SXValuesTableHead} />

                        <MptTableBody
                            getTableBodyProps={getTableBodyProps}
                            page={rows}
                            prepareRow={prepareRow}
                            isEven={isEven}
                            sxValues={SXValuesTableBody}
                            extraActions={false}
                        />
                    </Table>
                </Grid>

            </Grid>
        </React.Fragment >
    )
}


export default PaymentLogsTable;
