import React from 'react';
import { parseISO, format } from 'date-fns'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { Grid } from '@mui/material';

import { numberFormat } from './utils'

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        width: 50,
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value}</div>
        }
    },
    {
        Header: 'User',
        accessor: 'user_id',
        width: 100,
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value}</div>
        },
        Footer: info => <div style={{ textAlign: "center" }}>Total:</div>
    },
    {
        Header: 'Paid',
        accessor: 'paid',
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{numberFormat(row.value)}</div>
        },
        Footer: info => {
            // Only calculate total visits if rows change
            const total = React.useMemo(
                () =>
                    info.rows.reduce((sum, row) => row.values.paid + sum, 0),
                [info.rows]
            )

            return <div style={{ textAlign: "center" }}>{numberFormat(total)}</div>
        },
    },
    {
        Header: 'Reason',
        accessor: 'reason',
        width: 300,
    },
    {
        Header: 'Date',
        accessor: 'date',
        width: 300,
        Cell: (row) => {
            const custom_date = format(parseISO(row.value), "do MMM yyyy HH:mm:ss")
            return <div style={{ textAlign: "center" }}>{custom_date}</div>
        }
    },
    {
        Header: 'From Tenant?',
        accessor: 'from_tenant',
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value === true ? <CheckCircleIcon /> : <DoNotDisturbIcon />}</div>
        },
        Footer: info => {
            // Only calculate total visits if rows change
            const total = React.useMemo(
                () => {

                    console.log(info.rows)

                    const result = info.rows.map(obj => (obj.values.from_tenant));
                    console.log(result)
                    const trueCount = result.filter(Boolean).length;
                    const falseCount = result.length - trueCount

                    return { trueCount, falseCount }

                },
                [info.rows]
            )

            return (
                <Grid container alignItems="center">
                    <Grid item sx={{ pl: '28px', fontSize: '20px' }}>
                        {total.trueCount}
                    </Grid>
                    <Grid item sx={2}>
                        <CheckCircleIcon />
                    </Grid>
                    <Grid item sx={{ pl: '10px', fontSize: '20px' }}>
                        {total.falseCount}
                    </Grid>
                    <Grid item sx={2}>
                        <DoNotDisturbIcon />
                    </Grid>
                </Grid>

            )

            // return <div style={{ fontSize: '20px', textAlign: "center" }}>{total.trueCount} <CheckCircleIcon />  {total.falseCount} <DoNotDisturbIcon /></div>
        },
    },

]
