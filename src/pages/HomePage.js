import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import { AuthContext } from '../context/AuthContext'


import { useAuth } from '../context/AuthContext'

import AuthService from '../services/AuthService'

import HomePageT from '../components/homepageComponent/HomePage'

// async function login() {
//     const response = await axios.post('/login', {}, { auth: { username: "nayam", password: "password" } })
//     console.log(response)
//     console.log(response.headers)
// }

// async function login2() {
//     const response = await axios.post('/login', {}, { auth: { username: "hasnat", password: "password" } })
//     console.log(response)
//     console.log(response.headers)
// }

// async function get_login() {
//     const response = await axios.get('/get_login')
//     console.log(response)
// }




const HomePage = () => {

    const [ip, setIP] = useState('');

    const { get_login } = AuthService();
    const { user } = useAuth();

    // const { user, setUser } = useContext(AuthContext);

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/', {}, { withCredentials: false })
        // console.log(res.data);
        setIP(res.data.IPv4)
        // setIP("127.0.0.1")
    }

    useEffect(() => {
        //passing getData method to the lifecycle method
        getData()

    }, [])


    return (
        <div>

            <HomePageT />

            HELLOOO
            <h4>{ip}</h4>

            <h4>{window.location.href}</h4>

            {user && (<h4>Username: {user}</h4>)}



            <div><button>up</button></div>
            <div><button>down</button></div>


            <div><button onClick={get_login}>get_login</button></div>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </div>
    )
}

export default HomePage
