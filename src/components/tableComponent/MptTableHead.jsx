import { TableHead, TableRow, TableCell } from '@mui/material';

const MptTableHead = ({ headerGroups, sxValues, children }) => {
    return (
        <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <TableCell {...column.getHeaderProps()}
                            align="center"
                            sx={{ ...sxValues }}
                        >
                            {column.render('Header')}
                        </TableCell>
                    ))}

                    {/* Action Column for tables that allow edit / delete */}
                    {children}

                </TableRow>
            ))}
        </TableHead>
    )
}

export default MptTableHead
