import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PageNotFound from './pages/PageNotFound'
import PaymentsPage from './pages/PaymentsPage'
import AllPaymentsPage from './pages/AllPaymentsPage'
import OverpaymentsPage from './pages/OverpaymentsPage'
import AllOverpaymentsPage from './pages/AllOverpaymentsPage'
import HomeImprovementsPage from './pages/HomeImprovementsPage'
import AllHomeImprovementsPage from './pages/AllHomeImprovementsPage'
import LogsPage from './pages/LogsPage'

import { useAuth } from './context/AuthContext';
import { Header } from './components/headerComponent';
import { Footer } from './components/footerComponent/';

const Router = () => {

    const { loggedIn } = useAuth();

    return (
        <BrowserRouter>
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
                        <Route path="/payments" element={<PaymentsPage />} />
                        <Route path="/payments/all" element={<AllPaymentsPage />} />
                        <Route path="/overpayments" element={<OverpaymentsPage />} />
                        <Route path="/overpayments/all" element={<AllOverpaymentsPage />} />
                        <Route path="/home_improvements" element={<HomeImprovementsPage />} />
                        <Route path="/home_improvements/all" element={<AllHomeImprovementsPage />} />
                        <Route path="/logs" element={<LogsPage />} />
                        <Route path="*" element={<Navigate to="/404_not_found" />} />
                    </React.Fragment>

                )}
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Router;
