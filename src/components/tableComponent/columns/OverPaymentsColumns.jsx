import React from 'react';
import { parseISO, format } from 'date-fns'

import { numberFormat } from '../../generic/utils'
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
        width: 400,
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
]
