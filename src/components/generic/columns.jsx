import { parseISO, format } from 'date-fns'

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
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
        Cell: (props) => {
            //props.value will contain your date
            //you can convert your date here
            // const custom_date = parseISO(props.value).toString().slice(0, -22)
            // const custom_date = format(parseISO(props.value), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
            const custom_date = format(parseISO(props.value), "do MMM yyyy HH:mm:ss")
            return <span>{custom_date}</span>
        }
    },
    {
        Header: 'From Tenant?',
        accessor: 'from_tenant',
        Cell: (props) => {
            //props.value will contain your date
            //you can convert your date here
            // const custom_date = parseISO(props.value).toString().slice(0, -22)
            // const custom_date = format(parseISO(props.value), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
            const custom_val = JSON.stringify(props.value)
            return <span>{custom_val}</span>
        }
    },

]

// {
//     "date": "2021-08-28T15:25:13.538667",
//     "from_tenant": false,
//     "id": 1,
//     "paid": 20.0,
//     "reason": "new",
//     "user_id": "user"
// },