import React from 'react';

import { Dialog, DialogTitle, DialogContent, Typography, Button, Paper } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    const nodeRef = React.useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title-delete"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper ref={nodeRef} {...props} />
        </Draggable>
    );
}


const DeleteDialog = ({ openPopup, handleClose, children }) => {
    return (
        <Dialog
            open={openPopup}
            onClose={() => { handleClose() }}
            maxWidth="sm"
            PaperComponent={PaperComponent}
            PaperProps={{ sx: { position: 'fixed', top: 80 } }}
            aria-labelledby="draggable-dialog-title-delete"
        >
            <DialogTitle sx={{ cursor: 'move' }}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Delete Data
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

export default DeleteDialog
