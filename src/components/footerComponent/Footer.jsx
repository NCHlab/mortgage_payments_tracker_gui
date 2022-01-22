import React from 'react'

import { Typography, Toolbar, AppBar, Box, Link } from '@mui/material';

const Footer = () => {

    const phantom = {
        display: 'block',
        padding: '20px',
        height: '100px',
    }

    return (
        <React.Fragment>
            <div style={phantom} />

            <AppBar position="static" sx={{ position: "fixed", left: 0, bottom: 0, background: 'linear-gradient(45deg, #000000, #730000)' }}>

                <Toolbar disableGutters>
                    <Typography
                        component="div"
                        sx={{ mr: 1, flexGrow: 0.5 }}
                    />
                    <Box textAlign="center">
                        <Link target="_blank" rel="noreferrer" href="https://github.com/NCHlab/mortgage_payments_tracker_gui" color="inherit">
                            Mortgage Payments Tracker &#169; {new Date().getFullYear()}
                        </Link>

                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Footer;
