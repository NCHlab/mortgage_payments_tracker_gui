import React from 'react'
import { useState, useEffect } from 'react'

import AuthService from '../services/AuthService'
import HomePageT from '../components/homepageComponent/HomePage'
import PublicHomePage from '../components/publicHomepageComponent/PublicHomePage'

const HomePage = () => {

    const { get_login } = AuthService();
    const [resCode, setResCode] = useState(401)

    useEffect(() => {
        (async () => {
            const code = await get_login()
            setResCode(code)
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            {resCode === 200 ? <HomePageT /> : <PublicHomePage />}
        </div>
    )
}

export default HomePage
