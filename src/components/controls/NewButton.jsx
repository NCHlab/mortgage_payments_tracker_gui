import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

const NewButton = ({ handleAddNew }) => {
    return (
        <Button
            variant="outlined"
            onClick={handleAddNew}
            sx={{
                my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                ':hover': {
                    backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                    color: '#36c9ff',
                    border: '2px solid #000000'
                }
            }}><AddIcon />New</Button>
    )
}

export default NewButton
