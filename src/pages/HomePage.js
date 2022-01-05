import React from 'react'

import AuthService from '../services/AuthService'
import HomePageT from '../components/homepageComponent/HomePage'

const HomePage = () => {

    const { get_login } = AuthService();

    return (
        <div>
            <HomePageT value={get_login} />
            <button onClick={get_login}>get_login</button>
        </div>
    )
}

export default HomePage
