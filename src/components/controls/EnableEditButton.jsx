import React from 'react'
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Button } from '@mui/material';

const EnableEditButton = ({ handleEnableEditing, enableEditing }) => {
    return (
        <Button
            variant="outlined"
            onClick={handleEnableEditing}
            sx={{
                my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: enableEditing ? 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))' : 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                ':hover': {
                    backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                    color: 'white',
                    border: '2px solid #000000'
                }
            }}>{enableEditing ? (<React.Fragment><ToggleOnIcon sx={{ color: "#00ba1f" }} /> Edit</React.Fragment>) : (<React.Fragment><ToggleOffIcon sx={{ color: "#c70000" }} /> Edit</React.Fragment>)}
        </Button>
    )
}

export default EnableEditButton
