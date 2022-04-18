import React from 'react'

import { useNavigate } from "react-router-dom";

import { useAuth } from '../../context/AuthContext'
import useLogout from '../loginComponent/UseLogout'

const useHeader = () => {

    const classes = {
        main_menu_hover: {
            bgcolor: '#ffffff',
            color: 'black',
            border: '1px solid #ffffff',
        },
        main_menu: {
            my: 2, color: 'white', border: '1px solid transparent', display: 'block', mr: '5px'
        },
        title_page_hover: {
            bgcolor: 'gray',
            color: 'black',
            border: '1px solid #ffffff',
        },
        title_page: {
            my: 2, color: 'white', border: '1px solid transparent', display: 'block'
        }
    }

    const PATHNAME_OBJ_MAPPER = {
        "/payments": "MPT Payments",
        "/payments/all": "MPT All Payments",
        "/overpayments": "MPT Over Payments",
        "/overpayments/all": "MPT All Over Payments",
        "/other_payments": "MPT Other Payment",
        "/other_payments/all": "MPT All Other Payment",
        "/totals": "MPT Total Payments",
        "/logs": "MPT Logs",
    }

    const mobileLoggedOutPages = [{ name: "Home", href: "/home" }, { name: "Gallery", href: "/gallery" }]
    const mobileLoggedInPages = [{ name: "Home", href: "/home" },
    { name: "Payments", href: "/payments" },
    { name: "All Payments", href: "/payments/all" },
    { name: "Overpayments", href: "/overpayments" },
    { name: "All Overpayments", href: "/overpayments/all" },
    { name: "Other Payments", href: "/other_payments" },
    { name: "All Other Payments", href: "/other_payments/all" },
    { name: "Totals", href: "/totals" },
    { name: "Logs", href: "/logs" },
    { name: "Gallery", href: "/gallery" },
    ]

    const navigate = useNavigate();
    const { loggedIn } = useAuth();
    const { handleMainLogOut } = useLogout();

    const [anchorEl_pay, setAnchorEl_pay] = React.useState(null);
    const [anchorEl_over, setAnchorEl_over] = React.useState(null);
    const [anchorEl_home, setAnchorEl_home] = React.useState(null);
    const [anchorEl_menu, setAnchorEl_menu] = React.useState(null);
    const [anchorEl_mobile, setAnchorEl_mobile] = React.useState(null);

    const handleNavButtonClick = (event) => {
        const text = event.target.innerText.toLowerCase();

        if (text === "payments") {
            setAnchorEl_pay(event.currentTarget);
        } else if (text === "over payments") {
            setAnchorEl_over(event.currentTarget);
        } else if (text === "other payments") {
            setAnchorEl_home(event.currentTarget);
        } else if (text === "menu") {
            setAnchorEl_menu(event.currentTarget);
        }
    };

    const handleLogOut = () => {
        handleCloseMenu()
        handleMainLogOut()
    }

    const handleOpenMobileNavMenu = (event) => {
        setAnchorEl_mobile(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl_pay(null);
        setAnchorEl_over(null);
        setAnchorEl_home(null);
        setAnchorEl_menu(null);
        setAnchorEl_mobile(null);
    };

    const handleMenuClick = (pageURL) => {
        handleCloseMenu();
        handleNavigate(pageURL);

    };

    const handleNavigate = (pageURL) => {
        navigate(pageURL);
        handleCloseMenu();
    };

    const handlePageClick = (e, pageURL) => {
        e.preventDefault();
        navigate(pageURL);
    };


    const handleMiddleClick = (e, pageURL) => {
        if (e.button === 1) {
            window.open(pageURL, "_blank")
        }
    }

    const pageLocator = () => {
        const pageName = PATHNAME_OBJ_MAPPER[`${window.location.pathname}`]

        if (pageName === undefined) {
            return ""
        }
        return pageName
    }

    return {
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
    }
}

export default useHeader;
