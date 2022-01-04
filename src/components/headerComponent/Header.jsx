import useHeader from "./useHeader";

import React from 'react'

import { Button, Container, Typography, Toolbar, AppBar, Box, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Header = () => {

    const {
        classes,
        loggedIn,
        handleLogOut,
        anchorEl_pay,
        anchorEl_over,
        anchorEl_home,
        handleNavButtonClick,
        handleCloseMenu,
        handleMenuClick,
        handleNavigate } = useHeader();

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

                    <Box sx={{ flexGrow: loggedIn ? 0 : 0.01, display: { xs: 'none', md: 'flex' } }}>
                        <Button onClick={() => handleMenuClick('/home')} sx={{ ...classes.main_menu, ':hover': classes.main_menu_hover }}>
                            Home
                        </Button>
                    </Box>


                    {!loggedIn && (

                        <Box sx={{ flexGrow: 0.01, display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                variant="outlined"
                                startIcon={<LockOpenIcon />}
                                color="secondary"
                                onClick={() => { handleNavigate("/login") }}
                                sx={{
                                    my: 2, color: 'white', border: '2px solid #37db00',
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



                    {loggedIn && (
                        <React.Fragment>
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>

                                <Button onClick={(e) => handleNavButtonClick(e)} sx={{
                                    ...classes.main_menu,
                                    ':hover': classes.main_menu_hover
                                }}>
                                    Payments
                                </Button>

                                <Menu

                                    id="payments"
                                    anchorEl={anchorEl_pay}
                                    keepMounted
                                    open={Boolean(anchorEl_pay)}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{ onMouseLeave: handleCloseMenu }}
                                >
                                    <MenuItem onClick={() => handleMenuClick('/payments')}>My Payments</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick('/payments/all')}>All Payments</MenuItem>
                                </Menu>

                                <Button onClick={(e) => handleNavButtonClick(e)} sx={{ ...classes.main_menu, ':hover': classes.main_menu_hover }}>
                                    Over Payments
                                </Button>
                                <Menu

                                    id="overpayments"
                                    anchorEl={anchorEl_over}
                                    keepMounted
                                    open={Boolean(anchorEl_over)}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{ onMouseLeave: handleCloseMenu }}
                                >
                                    <MenuItem onClick={() => handleMenuClick('/overpayments')}>My OverPayments</MenuItem>
                                    <MenuItem onClick={() => handleMenuClick('/overpayments/all')}>All OverPayments</MenuItem>
                                </Menu>

                                <Button onClick={handleNavButtonClick} sx={{ ...classes.main_menu, ':hover': classes.main_menu_hover }}>
                                    Home Improvements
                                </Button>
                                <Menu

                                    id="home_improvements"
                                    anchorEl={anchorEl_home}
                                    keepMounted
                                    open={Boolean(anchorEl_home)}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{ onMouseLeave: handleCloseMenu }}
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
                                    onClick={() => { handleLogOut() }}
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
    )
}

export default Header
