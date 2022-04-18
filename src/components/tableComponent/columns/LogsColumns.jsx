import React from 'react';
import { parseISO, format } from 'date-fns'

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
        width: 50,
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value[0].toUpperCase() + row.value.slice(1)}</div>
        },
        disableFilters: true
    },
    {
        Header: 'Action',
        accessor: 'action',
        width: 50,
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value}</div>
        },
        disableFilters: true,
    },
    {
        Header: 'Table Name',
        accessor: 'table_name',
        width: 100,
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value}</div>
        },
        disableFilters: true,
    },
    {
        Header: 'New Values',
        accessor: 'new_values',
        width: 300,
        Cell: (row) => {
            const valueData = {
                id: row.value.id,
                user_id: row.value.user_id,
                paid: row.value.paid,
                reason: row.value.reason,
                date: row.value.date,
                ...row.value
            }
            return <div><pre>{JSON.stringify(valueData, null, 2)}</pre></div>
        },
        disableFilters: true,
    },
    {
        Header: 'Prev Values',
        accessor: 'prev_values',
        width: 300,
        Cell: (row) => {
            const valueData = {
                id: row.value.id,
                user_id: row.value.user_id,
                paid: row.value.paid,
                reason: row.value.reason,
                date: row.value.date,
                ...row.value
            }
            return <div><pre>{JSON.stringify(valueData, null, 2)}</pre></div>
        },
        disableFilters: true,
    },
    {
        Header: 'Date',
        accessor: 'date',
        width: 200,
        Cell: (row) => {
            const custom_date = format(parseISO(row.value), "do MMM yyyy HH:mm:ss")
            return <div style={{ textAlign: "center" }}>{custom_date}</div>
        },
    },

]
