import React, { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import AlertTitle from '@mui/material/AlertTitle';

const TransitionDown = (props) => {
    return <Slide {...props} direction="down" />;
}

const Notification = ({ notify, setNotify }) => {

    const [transition, setTransition] = useState(undefined);

    useEffect(() => {
        setTransition(() => TransitionDown);
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            sx={{ mt: '80px' }}
            open={notify.isOpen}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}
            TransitionComponent={transition}
        >

            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {/* <AlertTitle>Processed</AlertTitle> */}
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
