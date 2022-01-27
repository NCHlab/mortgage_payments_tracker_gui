import { useState } from 'react';

const usePublicHomePage = () => {
    const [showDemoCard, setShowDemoCard] = useState(false)
    const [userCode, setUserCode] = useState('')
    const [userValue, setUserValue] = useState('')
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [genCodeLoading, setGenCodeLoading] = useState(false);
    const [timeoutNum, setTimeoutNum] = useState(2000);

    const demoURL = process.env.REACT_APP_DEMO_URL || "URL Not Set"
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

    const handleCodeCheck = () => {
        if (userCode === '' || userValue === '') {
            setIsError(true)
        } else if (userCode.toUpperCase() === userValue.toUpperCase()) {
            setIsError(false)
            setLoading(true)
        } else {
            setIsError(true)
            generateUserCode()
        }
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
        demoURL
    };
};

export default usePublicHomePage;
