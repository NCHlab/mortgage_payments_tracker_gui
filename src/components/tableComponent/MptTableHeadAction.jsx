import { TableCell } from '@mui/material';

const MptTableHeadAction = ({ sxValues }) => {
    return (
        <TableCell
            align="center"
            sx={{ ...sxValues }}
        >
            Action
        </TableCell>
    )
}

export default MptTableHeadAction
