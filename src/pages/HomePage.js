import React from 'react'
import { useState, useEffect } from 'react'

import AuthService from '../services/AuthService'
import HomePageT from '../components/homepageComponent/HomePage'

const HomePage = () => {

    const { get_login } = AuthService();

    const [x, setX] = useState(401)

    // useEffect(() => {
    //     const y = get_login()
    //     console.log(y)
    //     setX(y)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    useEffect(() => {
        async function fetchMyAPI() {
            const y = await get_login()
            setX(y)
            console.log(y)
        }

        fetchMyAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            {x === 200 ? <HomePageT /> : ""}
        </div>
    )
}

export default HomePage
