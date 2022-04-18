import React from 'react';
import { parseISO, format } from 'date-fns'
import { Grid } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { numberFormat } from '../../generic/utils'
import { SelectColumnFilter } from '../filters/SelectFilter'
import { NumberRangeColumnFilter } from '../filters/NumberRangeFilter'

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        width: 50,
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value}</div>
        },
        disableFilters: true
    },
    {
        Header: 'User',
        accessor: 'user_id',
        width: 100,
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value[0].toUpperCase() + row.value.slice(1)}</div>
        },
        Footer: info => <div style={{ textAlign: "center" }}>Total:</div>
    },
    {
        Header: 'Paid',
        accessor: 'paid',
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{numberFormat(row.value)}</div>
        },
        Footer: props => {
            const total = React.useMemo(
                () =>
                    props.rows.reduce((sum, row) => row.values.paid + sum, 0),
                [props.rows]
            )

            return <div style={{ textAlign: "center" }}>{numberFormat(total)}<span style={{ color: 'red' }}>*</span></div>
        },
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        // Aggregate the sum of all visits
        aggregate: 'sum',
        Aggregated: ({ value }) => `${value} (total)`,
    },
    {
        Header: 'Reason',
        accessor: 'reason',
        width: 300,
        Footer: props => {

            const total = React.useMemo(
                () => {

                    const array_of_chargeable = [];
                    for (const x of props.rows) {
                        if (x.values.chargeable) {
                            array_of_chargeable.push(x.values.paid)
                        }
                    }
                    return array_of_chargeable
                },
                [props.rows]
            )
            return (<div style={{ textAlign: "center" }}> Chargeable: {numberFormat(total.reduce((a, b) => a + b, 0))}</div>)
        },
        disableFilters: true
    },
    {
        Header: 'Date',
        accessor: 'date',
        width: 300,
        Cell: (row) => {
            const custom_date = format(parseISO(row.value), "do MMM yyyy HH:mm:ss")
            return <div style={{ textAlign: "center" }}>{custom_date}</div>
        },
        disableFilters: true
    },
    {
        Header: 'Chargeable?',
        accessor: 'chargeable',
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value === true ? <CheckCircleIcon /> : <DoNotDisturbIcon />}</div>
        },
        Filter: SelectColumnFilter,
        Footer: props => {
            // Only calculate total if rows change
            const total = React.useMemo(
                () => {
                    const result = props.rows.map(obj => (obj.values.chargeable));
                    const trueCount = result.filter(Boolean).length;
                    const falseCount = result.length - trueCount

                    return { trueCount, falseCount }

                },
                [props.rows]
            )

            return (
                <Grid container alignItems="center">
                    <Grid item sx={{ pl: '28px', fontSize: '20px' }}>
                        {total.trueCount}
                    </Grid>
                    <Grid item xs={2}>
                        <CheckCircleIcon />
                    </Grid>
                    <Grid item sx={{ pl: '10px', fontSize: '20px' }}>
                        {total.falseCount}
                    </Grid>
                    <Grid item xs={2}>
                        <DoNotDisturbIcon />
                    </Grid>
                </Grid>
            )
        },
    },

]
