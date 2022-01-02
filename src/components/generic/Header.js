// import React from 'react'

// const Header = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default Header


import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';

import { Link as RouterLink, MemoryRouter } from 'react-router-dom';

import { Button, Avatar, Container, Typography, IconButton, Toolbar, AppBar, Box, Menu, Tooltip, MenuItem, AccountCircle } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';

// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const pages = ['Your Payments', "All Payments", 'Your Overpayments', 'All Overpayments', 'Your Home Improvements', 'All Home Improvements'];
const pageNav = [
    { "name": 'Home', "link": "/" },
    { "name": 'Your Payments', "link": "/payments" },
    { "name": 'All Payments', "link": "/payments/all" },
    { "name": 'Your Overpayments', "link": "/overpayments" },
    { "name": 'All Overpayments', "link": "/overpayments/all" },
    { "name": 'Your Home Improvements', "link": "/home_improvements" },
    { "name": 'All Home Improvements', "link": "/home_improvements/all" }]


const pageNav2 = [
    { name: "Payments", menu: [{ "name": 'Your Payments', "link": "/payments" }, { "name": 'All Payments', "link": "/payments/all" }] },
    { name: "Overpayments", menu: [{ "name": 'Your Overpayments', "link": "/overpayments" }, { "name": 'All Overpayments', "link": "/overpayments/all" }] },
    { name: "Home Improvements", menu: [{ "name": 'Your Home Improvements', "link": "/home_improvements" }, { "name": 'All Home Improvements', "link": "/home_improvements/all" }] }]

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const navigationLinks = [
    { name: "Payments", href: "/payments" },
    { name: "Overpayments", href: "/overpayments" },
    { name: "Home Improvement", href: "/home_improvement" },
];



const Header = () => {

    const navigate = useNavigate();

    // const classes = useStyles()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl_pay, setAnchorEl_pay] = React.useState(null);
    const [anchorEl_over, setAnchorEl_over] = React.useState(null);
    const [anchorEl_home, setAnchorEl_home] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl_pay(null);
        setAnchorEl_over(null);
        setAnchorEl_home(null);
    };

    const handleNavButtonClick = (event) => {

        const text = event.target.innerText.toLowerCase();
        console.log(text)

        if (text == "payments") {
            setAnchorEl_pay(event.currentTarget);
        } else if (text == "over payments") {
            setAnchorEl_over(event.currentTarget);
        } else if (text == "home improvements") {
            setAnchorEl_home(event.currentTarget);
        } else {
            setAnchorEl(event.currentTarget);
        }

    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setAnchorEl_pay(null);
        setAnchorEl_over(null);
        setAnchorEl_home(null);
    };


    const handleMenuClick = (pageURL) => {
        handleCloseMenu();
        navigate(pageURL);
    };

    const handleAuth = (auth_on) => {
        setAuth(auth_on)
    }



    return (
        <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(45deg, #730000, #000000)' }}>
            <Container maxWidth="false">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
                    >
                        Mortgage Payments Tracker
                    </Typography>



                    {!auth && (

                        <Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                variant="outlined"
                                startIcon={<LockOpenIcon />}
                                color="secondary"
                                onClick={() => { handleAuth(true) }}
                                sx={{
                                    my: 0, color: 'white', border: '2px solid #37db00',
                                    ':hover': {
                                        bgcolor: '#41d63c',
                                        color: 'black',
                                        border: '2px solid #000'
                                    }
                                }}>
                                Login
                            </Button>
                        </Box>
                    )}



                    {auth && (
                        <React.Fragment>
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                <Button onClick={() => handleMenuClick('/home')} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Home
                                </Button>

                                <Button onClick={(e) => handleNavButtonClick(e)} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Payments
                                </Button>

                                <Menu

                                    id="payments"
                                    anchorEl={anchorEl_pay}
                                    keepMounted
                                    open={Boolean(anchorEl_pay)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={() => handleMenuClick('/payments')}>My Payments</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick('/payments/all')}>All Payments</MenuItem>
                                </Menu>

                                <Button onClick={(e) => handleNavButtonClick(e)} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Over Payments
                                </Button>
                                <Menu

                                    id="overpayments"
                                    anchorEl={anchorEl_over}
                                    keepMounted
                                    open={Boolean(anchorEl_over)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={() => handleMenuClick('/overpayments')}>My OverPayments</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick('/overpayments/all')}>All OverPayments</MenuItem>
                                </Menu>

                                <Button onClick={handleNavButtonClick} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Home Improvements
                                </Button>
                                <Menu

                                    id="home_improvements"
                                    anchorEl={anchorEl_home}
                                    keepMounted
                                    open={Boolean(anchorEl_home)}
                                    onClose={handleCloseMenu}
                                >

                                    <MenuItem onClick={() => handleMenuClick('/home_improvements')}>My Home Improvements</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick('/home_improvements/all')}>All Home Improvements</MenuItem>
                                </Menu>
                            </Box>

                            <Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<LogoutIcon />}
                                    color="secondary"
                                    onClick={() => { handleAuth(false) }}
                                    sx={{
                                        my: 0, color: 'white', border: '2px solid #cf0000',
                                        ':hover': {
                                            bgcolor: '#e33434',
                                            color: 'black',
                                            border: '2px solid #000'
                                        }
                                    }}>
                                    Logout
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}







                    {/* <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {pageNav.map((page) => (
                            <Button
                                component={RouterLink}
                                to={page.link}
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box> */}











                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="SRemy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default Header;