import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PageNotFound from './pages/PageNotFound'
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { useAuth } from './context/AuthContext';

// import Header from "./components/generic/Header";
import { Header } from './components/headerComponent';
import { Footer } from './components/footerComponent/';

const Router = () => {

    const { loggedIn } = useAuth();


    return (
        <BrowserRouter>
            {/* <Header2 /> */}
            <Header />

            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/404_not_found" element={<PageNotFound />} />



                {!loggedIn ? (
                    <React.Fragment>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<Navigate to="/404_not_found" />} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Route path="/login" element={<Navigate to="/" />} />
                        <Route path="/payments" element={<HomePage />} />
                        <Route path="/payments/all" element={<HomePage />} />
                        <Route path="/overpayments" element={<HomePage />} />
                        <Route path="/overpayments/all" element={<HomePage />} />
                        <Route path="/home_improvements" element={<HomePage />} />
                        <Route path="/home_improvements/all" element={<HomePage />} />
                    </React.Fragment>

                )}



                {/* {!loggedIn && (
                    <React.Fragment>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<Navigate to="/" />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </React.Fragment>
                )}



                {loggedIn && (
                    <React.Fragment>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<Navigate to="/" />} />
                        <Route path="/payments" element={<HomePage />} />
                        <Route path="/payments/all" element={<HomePage />} />
                        <Route path="/overpayments" element={<HomePage />} />
                        <Route path="/overpayments/all" element={<HomePage />} />
                        <Route path="/home_improvements" element={<HomePage />} />
                        <Route path="/home_improvements/all" element={<HomePage />} />
                    </React.Fragment>

                )} */}
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Router;
