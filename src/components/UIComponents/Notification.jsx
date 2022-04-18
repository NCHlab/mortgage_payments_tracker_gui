import React, { useState, useEffect } from 'react'

import { Alert, Snackbar, Slide } from '@mui/material';

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
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
