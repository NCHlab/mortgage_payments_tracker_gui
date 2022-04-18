import React, { Fragment } from 'react'

import { Button, Container, Typography, Toolbar, AppBar, Box, Menu, MenuItem, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useHeader from "./useHeader";

const Header = () => {

    const {
        classes,
        loggedIn,
        handleLogOut,
        anchorEl_pay,
        anchorEl_over,
        anchorEl_home,
        anchorEl_menu,
        anchorEl_mobile,
        handleNavButtonClick,
        handleOpenMobileNavMenu,
        handleCloseMenu,
        handleMenuClick,
        handleNavigate,
        handleMiddleClick,
        pageLocator,
        mobileLoggedOutPages,
        mobileLoggedInPages,
        handlePageClick
    } = useHeader();

    return (

        <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(45deg, #730000, #000000)' }}>
            <Container maxWidth="false">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={(e) => { handlePageClick(e, "/home") }}
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 1, cursor: 'pointer' }}
                    >
                        Mortgage Payments Tracker
                    </Typography>


                    {loggedIn && (
                        <Fragment>
                            <Typography
                                component="div"
                                sx={{
                                    mr: 0, display: { xs: 'none', md: 'flex' }, flexGrow: 0.01,
                                }}
                            />

                            <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>{pageLocator()}</Typography>

                            <Typography
                                component="div"
                                sx={{
                                    mr: 0, display: { xs: 'none', md: 'flex' }, flexGrow: 0.7,
                                }}
                            />
                        </Fragment>
                    )}

                    <Box sx={{ flexGrow: loggedIn ? 0 : 0, display: { xs: 'none', md: 'flex' } }}>
                        <Button onMouseDown={(e) => handleMiddleClick(e, '/home')} onClick={() => handleMenuClick('/home')} sx={{ ...classes.main_menu, ':hover': classes.main_menu_hover }}>
                            Home
                        </Button>
                    </Box>

                    {!loggedIn && (
                        <React.Fragment>
                            <Box sx={{ flexGrow: loggedIn ? 0 : 0.01, display: { xs: 'none', md: 'flex' } }}>
                                <Button onMouseDown={(e) => handleMiddleClick(e, '/gallery')} onClick={() => handleMenuClick('/gallery')} sx={{ ...classes.main_menu, ':hover': classes.main_menu_hover }}>
                                    Gallery
                                </Button>
                            </Box>

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
                        </React.Fragment>
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
                                    <MenuItem component="a" href='/payments' onClick={(e) => { handlePageClick(e, "/payments") }}>My Payments</MenuItem>
                                    <MenuItem component="a" href='/payments/all' onClick={(e) => { handlePageClick(e, "/payments/all") }}>All Payments</MenuItem>
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
                                    <MenuItem component="a" href='/overpayments' onClick={(e) => { handlePageClick(e, "/overpayments") }}>My Over Payments</MenuItem>
                                    <MenuItem component="a" href='/overpayments/all' onClick={(e) => { handlePageClick(e, "/overpayments/all") }}>All Over Payments</MenuItem>
                                </Menu>

                                <Button onClick={handleNavButtonClick} sx={{ ...classes.main_menu, ':hover': classes.main_menu_hover }}>
                                    Other Payments
                                </Button>
                                <Menu
                                    id="other_payments"
                                    anchorEl={anchorEl_home}
                                    keepMounted
                                    open={Boolean(anchorEl_home)}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{ onMouseLeave: handleCloseMenu }}
                                >
                                    <MenuItem component="a" href='/other_payments' onClick={(e) => { handlePageClick(e, "/other_payments") }}>My Other Payments</MenuItem>
                                    <MenuItem component="a" href='/other_payments/all' onClick={(e) => { handlePageClick(e, "/other_payments/all") }}>All Other Payments</MenuItem>
                                </Menu>



                                <Button onClick={handleNavButtonClick} sx={{ ...classes.main_menu, ':hover': classes.main_menu_hover }}>
                                    Menu
                                </Button>
                                <Menu
                                    id="menu"
                                    anchorEl={anchorEl_menu}
                                    keepMounted
                                    open={Boolean(anchorEl_menu)}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{ onMouseLeave: handleCloseMenu }}
                                >
                                    <MenuItem component="a" href='/totals' onClick={(e) => { handlePageClick(e, "/totals") }}>Totals</MenuItem>
                                    <MenuItem component="a" href='/gallery' onClick={(e) => { handlePageClick(e, "/gallery") }}>Gallery</MenuItem>
                                    <MenuItem component="a" href='/logs' onClick={(e) => { handlePageClick(e, "/logs") }}>Logs</MenuItem>
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



                    {/* Mobile Nav Menu */}

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={(e) => { handlePageClick(e, "/home") }}
                        sx={{ flexGrow: 1, color: 'white', textDecoration: 'none', display: { xs: 'flex', md: 'none' } }}
                    >
                        Mortgage Payments Tracker
                    </Typography>

                    {!loggedIn && (

                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenMobileNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl_mobile}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl_mobile)}
                                onClose={handleCloseMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {mobileLoggedOutPages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={(e) => {
                                            handleCloseMenu()
                                            handlePageClick(e, page.href)
                                        }}
                                        component="a">
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}

                                <Button
                                    variant="outlined"
                                    startIcon={<LockOpenIcon />}
                                    color="secondary"
                                    onClick={() => { handleNavigate("/login") }}
                                    sx={{
                                        mt: '5px', ml: '5px', mr: '5px', color: 'gray', border: '2px solid #37db00',
                                        ':hover': {
                                            bgcolor: '#41d63c',
                                            color: 'black',
                                            border: '2px solid #000'
                                        }
                                    }}>
                                    Login
                                </Button>
                            </Menu>
                        </Box>)}



                    {loggedIn && (<Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenMobileNavMenu}
                            color="inherit"
                        >
                            <AccountCircleIcon sx={{ fontSize: 30 }} />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl_mobile}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl_mobile)}
                            onClose={handleCloseMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {mobileLoggedInPages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    component="a"
                                    href={page.href}
                                    onClick={(e) => {
                                        handleCloseMenu()
                                        handlePageClick(e, page.href)
                                    }}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}

                            <Button
                                variant="outlined"
                                startIcon={<LogoutIcon />}
                                color="secondary"
                                onClick={() => { handleLogOut() }}
                                sx={{
                                    mt: '5px', ml: '15px', color: 'gray', border: '2px solid #cf0000',
                                    ':hover': {
                                        bgcolor: '#e33434',
                                        color: 'black',
                                        border: '2px solid #000'
                                    }
                                }}>
                                Logout
                            </Button>
                        </Menu>
                    </Box>)}

                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Header
