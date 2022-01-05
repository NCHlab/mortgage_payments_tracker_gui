import React from 'react'
import { useState, useEffect } from 'react'

import AuthService from '../services/AuthService'
import HomePageT from '../components/homepageComponent/HomePage'

const HomePage = () => {

    const { get_login } = AuthService();
    const [resCode, setResCode] = useState(401)


    useEffect(() => {
        async function fetchLogin() {
            const code = await get_login()
            setResCode(code)
            console.log(code)
        }

        fetchLogin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            {resCode === 200 ? <HomePageT /> : ""}
        </div>
    )
}

export default HomePage
