import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';



import { Button } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MptTableBody = ({ getTableBodyProps, rows, prepareRow, isEven, sxValues, enableEditing, handleEditing, extraActions, handleOpenDeletePopup }) => {


    return (
        <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <TableRow {...row.getRowProps()}
                        sx={{
                            '&:hover': {
                                border: '2px solid #878787'
                            }
                        }}>
                        {row.cells.map(cell => {
                            return (
                                <TableCell {...cell.getCellProps({
                                    style: {
                                        width: cell.column.width || 300,
                                    },
                                })}
                                    sx={sxValues(i)}>
                                    {cell.render('Cell')}
                                </TableCell>
                            )
                        })}


                        {extraActions && (

                            <TableCell
                                sx={{
                                    width: '200px',
                                    pl: '20px',
                                    pr: '0px',
                                    pb: '5px',
                                    pt: '5px',
                                    // border: 'solid 1px gray',
                                    background: isEven(i) ? '#ffffff' : '#ededed',
                                    borderLeft: '1px dotted #000',
                                    '&:hover': {
                                        backgroundColor: '#fffbf2',
                                    },
                                }}
                            >

                                <Button disabled={!enableEditing} onClick={() => handleEditing(row.values)}
                                    sx={{
                                        my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', mr: '5px', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                                        ':hover': {
                                            backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                            color: 'white',
                                            border: '2px solid #000000'
                                        }
                                    }}><EditIcon></EditIcon></Button>

                                <Button disabled={!enableEditing} onClick={() => handleOpenDeletePopup(row.values)}
                                    sx={{
                                        my: 2, color: '#dedede', border: '2px solid #000000', mt: '0px', mb: '0px', ml: '5px', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0, 0.5), rgba(43, 43, 43, 0.5))',
                                        ':hover': {
                                            backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                                            color: 'white',
                                            border: '2px solid #000000'
                                        }
                                    }}><DeleteIcon></DeleteIcon></Button>
                            </TableCell>
                        )}

                    </TableRow>
                )
            })}
        </TableBody>
    )
}

export default MptTableBody
