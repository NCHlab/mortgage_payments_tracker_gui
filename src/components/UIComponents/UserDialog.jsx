import React from 'react'

import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
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

    const isTouch = isTouchDevice();

    const handleClose = () => {
        setOpenPopup(false)
    }

    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    return (
        <React.Fragment>
            {!isTouch && (
                <Dialog
                    open={openPopup}
                    onClose={handleClose}
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
                            <Button sx={{ padding: '5px' }} onClick={handleClose}><CloseIcon /></Button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        {children}
                    </DialogContent>
                </Dialog>)}


            {isTouch && (
                <Dialog
                    open={openPopup}
                    onClose={handleClose}
                    maxWidth="sm"
                    PaperProps={{ sx: { position: 'fixed', top: 80 } }}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle sx={{ cursor: 'move' }}>
                        <div style={{ display: 'flex' }}>
                            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                                {formTitle}
                            </Typography>
                            <Button sx={{ padding: '5px' }} onClick={handleClose}><CloseIcon /></Button>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        {children}
                    </DialogContent>
                </Dialog>)}

        </React.Fragment>

    )
}

export default UserDialog
