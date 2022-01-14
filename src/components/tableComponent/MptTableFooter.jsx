import { TableRow } from '@mui/material';
import { TableFooter } from '@mui/material';
import { TableCell } from '@mui/material';

const MptTableFooter = ({ footerGroups, extraActions }) => {
    return (
        <TableFooter >
            {footerGroups.map((group, i) => (
                <TableRow {...group.getFooterGroupProps()}>
                    {group.headers.map(column => (
                        <TableCell
                            sx={{
                                pl: '0px',
                                pr: '0px',
                                pb: '5px',
                                pt: '5px',
                                fontSize: '15px',
                                color: 'black',
                                fontWeight: 'bold',
                                background: '#ffffff',
                                borderLeft: '1px dotted #000',

                            }}
                            {...column.getFooterProps()}>{column.render('Footer')}</TableCell>
                    ))}

                    {extraActions && (
                        <TableCell
                            sx={{
                                background: '#ffffff',
                                borderLeft: '1px dotted #000'

                            }}
                        >
                        </TableCell>
                    )}
                </TableRow>
            ))}


        </TableFooter>
    )
}

export default MptTableFooter
