import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import { ChildFriendly } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';


function PaperComponent(props) {
    const nodeRef = React.useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper ref={nodeRef} {...props} />
        </Draggable>
    );
}

const UserDialog = (props) => {

    const { openPopup, setOpenPopup, formTitle, children } = props;

    const handleClose = () => {
        setOpenPopup(false)
    }

    return (
        <Dialog
            open={openPopup}
            onClose={() => { handleClose() }}
            maxWidth="sm"
            PaperComponent={PaperComponent}
            PaperProps={{ sx: { position: 'fixed', top: 80 } }}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle sx={{ cursor: 'move' }}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {formTitle}
                    </Typography>
                    <Button onClick={() => { handleClose() }}><CloseIcon /></Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default UserDialog
