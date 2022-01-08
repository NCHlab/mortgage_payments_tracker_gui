import { parseISO, format } from 'date-fns'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        Cell: (row) => {
            return <div style={{ textAlign: "center" }}>{row.value}</div>
        }
    },
    {
        Header: 'User',
        accessor: 'user_id'
    },
    {
        Header: 'Paid',
        accessor: 'paid'
    },
    {
        Header: 'Reason',
        accessor: 'reason'
    },
    {
        Header: 'Date',
        accessor: 'date',
        Cell: (row) => {
            const custom_date = format(parseISO(row.value), "do MMM yyyy HH:mm:ss")
            return <span>{custom_date}</span>
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
