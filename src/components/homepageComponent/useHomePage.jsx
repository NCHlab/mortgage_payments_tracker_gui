import { useState } from 'react'
import HomePageService from '../../services/HomePageService'

const useHomePage = () => {

    const { mortgageInfo } = HomePageService();
    const [mortgageData, setMortgageData] = useState({})

    const getMortgageInfo = async () => {
        const { data } = await mortgageInfo();
        setMortgageData(data)
    }

    return { getMortgageInfo, mortgageData }
}

export default useHomePage
