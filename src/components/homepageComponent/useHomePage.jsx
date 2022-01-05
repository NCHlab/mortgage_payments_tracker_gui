import { useState } from 'react'
import HomePageService from '../../services/HomePageService'
import { useAuth } from '../../context/AuthContext'


const useHomePage = () => {

    const { mortgageInfo, genInfo, userPaymentInfo } = HomePageService();
    const [mortgageData, setMortgageData] = useState({})
    const [paymentData, setPaymentData] = useState({})
    const [userData, setUserData] = useState({ IPv4: '', country_name: '', city: '' });
    const { user } = useAuth();
    const [isRefreshed, setIsRefreshed] = useState(false)

    const getMortgageInfo = async () => {
        const { data } = await mortgageInfo();
        setMortgageData(data)
    }

    const getUserPaymentInfo = async () => {
        const data = await userPaymentInfo();
        setPaymentData(data)
    }

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'GBP'
        }).format(value);


    const getGenInfo = async () => {
        const res = await genInfo()
        setUserData({ IPv4: res.IPv4, country_name: res.city + ', ' + res.country_name, city: res.city })
    }

    const refreshInfo = () => {
        getMortgageInfo()
        getGenInfo()
        setIsRefreshed(true)

        setTimeout(
            () => setIsRefreshed(false),
            3000
        );
    }


    return {
        getMortgageInfo, mortgageData,
        numberFormat, getGenInfo,
        userData, user,
        refreshInfo, isRefreshed,
        getUserPaymentInfo, paymentData
    }
}

export default useHomePage
