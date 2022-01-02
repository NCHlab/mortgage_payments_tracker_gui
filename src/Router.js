import HomePage from './pages/HomePage'
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Header from "./components/generic/Header";
import Header2 from "./components/generic/Header2";
// import Footer from "./components/generic/Footer";

const Router = () => {
    return (
        <BrowserRouter>
            {/* <Header2 /> */}
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/payments" element={<HomePage />} />
                <Route path="/payments/all" element={<HomePage />} />
                <Route path="/overpayments" element={<HomePage />} />
                <Route path="/overpayments/all" element={<HomePage />} />
                <Route path="/home_improvements" element={<HomePage />} />
                <Route path="/home_improvements/all" element={<HomePage />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    )
}

export default Router;
