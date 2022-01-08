import { parseISO, format } from 'date-fns'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

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
        }
    },
    {
        Header: 'Paid',
        accessor: 'paid',
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{numberFormat(row.value)}</div>
        }
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
        }
    },

]
