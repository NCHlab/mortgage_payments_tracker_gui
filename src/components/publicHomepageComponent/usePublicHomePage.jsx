import { useState } from 'react';

import AuthService from '../../services/AuthService'
import CoreLogic from '../coreComponent/CoreLogic'

const usePublicHomePage = () => {
    const [showDemoCard, setShowDemoCard] = useState(false)
    const [userCode, setUserCode] = useState('')
    const [userValue, setUserValue] = useState('')
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [genCodeLoading, setGenCodeLoading] = useState(false);
    const [timeoutNum, setTimeoutNum] = useState(2000);
    const [demoLoginData, setDemoLoginData] = useState({ username: '', password: '' })
    const { demoLogin } = AuthService();
    const { sleep, setOpenPopup, openPopup } = CoreLogic();

    const demoURL = process.env.REACT_APP_DEMO_URL || "<- Demo Site Currently Offline ->"
    const isDemoSite = (process.env.REACT_APP_IS_DEMO_SITE === 'true') || false

    const handleShowDemo = () => {
        setShowDemoCard(prev => !prev)
    }

    const generateUserCode = () => {
        setGenCodeLoading(true)
        setTimeout(() => {
            setUserCode(Math.random().toString(36).substring(2, 10))
            setGenCodeLoading(false)
            setTimeoutNum(prev => prev + 1000)
        }, timeoutNum);
    }

    const handleCodeCheck = async () => {
        if (userCode === '' || userValue === '') {
            setIsError(true)
        } else if (userCode.toUpperCase() === userValue.toUpperCase()) {
            setIsError(false)
            setLoading(true)

            const data = await demoLogin()
            await sleep(1750);
            setDemoLoginData(data)
            setLoading(false)
            setUserValue('')
            setOpenPopup(true)
            setUserCode('')

        } else {
            setIsError(true)
            generateUserCode()
        }
    }

    const handleClose = () => {
        setOpenPopup(false)
    }

    return {
        handleShowDemo,
        handleCodeCheck,
        generateUserCode,
        setUserValue,
        showDemoCard,
        userCode,
        isError,
        loading,
        userValue,
        genCodeLoading,
        isDemoSite,
        demoURL,
        demoLoginData,
        openPopup,
        handleClose,
    };
};

export default usePublicHomePage;
