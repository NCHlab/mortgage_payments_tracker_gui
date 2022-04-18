import React from 'react';

import { Dialog, DialogTitle, DialogContent, Typography, Button, Paper, Grid, TextField } from '@mui/material';

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


const DemoLoginDialog = ({ openPopup, handleClose, loginData }) => {
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
                        Temporary Login Details
                    </Typography>
                    <Button onClick={() => { handleClose() }}><CloseIcon /></Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Grid
                    container
                    spacing={0}
                >

                    <Grid item xs={12}>
                        <Typography variant="button" display="block">
                            This is a One Time Password that changes upon login
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            disabled
                            sx={{ width: '262px' }}
                            color="secondary"
                            margin="normal"

                            label={"Username"}
                            value={loginData.username}
                            name="username"
                            id={loginData.username}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            disabled
                            sx={{ width: '262px' }}
                            color="secondary"
                            margin="normal"

                            label="Password"
                            value={loginData.password}
                            name="password"
                            id={loginData.password}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default DemoLoginDialog
