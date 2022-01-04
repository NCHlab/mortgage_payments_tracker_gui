import React from 'react'

import { useNavigate } from "react-router-dom";

import { useAuth } from '../../context/AuthContext'
import useLogout from '../loginComponent/UseLogout'

const useHeader = () => {

    // const pageNav = [
    //     { name: "Payments", menu: [{ "name": 'Your Payments', "link": "/payments" }, { "name": 'All Payments', "link": "/payments/all" }] },
    //     { name: "Overpayments", menu: [{ "name": 'Your Overpayments', "link": "/overpayments" }, { "name": 'All Overpayments', "link": "/overpayments/all" }] },
    //     { name: "Home Improvements", menu: [{ "name": 'Your Home Improvements', "link": "/home_improvements" }, { "name": 'All Home Improvements', "link": "/home_improvements/all" }] }]

    const classes = {
        main_menu_hover: {
            bgcolor: '#ffffff',
            color: 'black',
            border: '1px solid #ffffff',
        },
        main_menu: {
            my: 2, color: 'white', border: '1px solid transparent', display: 'block'
        }
    }

    const navigate = useNavigate();
    const { loggedIn } = useAuth();
    const { handleLogOut } = useLogout();

    const [anchorEl_pay, setAnchorEl_pay] = React.useState(null);
    const [anchorEl_over, setAnchorEl_over] = React.useState(null);
    const [anchorEl_home, setAnchorEl_home] = React.useState(null);

    const handleNavButtonClick = (event) => {
        const text = event.target.innerText.toLowerCase();

        if (text === "payments") {
            setAnchorEl_pay(event.currentTarget);
        } else if (text === "over payments") {
            setAnchorEl_over(event.currentTarget);
        } else if (text === "home improvements") {
            setAnchorEl_home(event.currentTarget);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl_pay(null);
        setAnchorEl_over(null);
        setAnchorEl_home(null);
    };

    const handleMenuClick = (pageURL) => {
        handleCloseMenu();
        handleNavigate(pageURL);
    };

    const handleNavigate = (pageURL) => {
        navigate(pageURL);
    };


    return {
        classes,
        loggedIn,
        handleLogOut,
        anchorEl_pay,
        anchorEl_over,
        anchorEl_home,
        handleNavButtonClick,
        handleCloseMenu,
        handleMenuClick,
        handleNavigate
    }
}

export default useHeader
