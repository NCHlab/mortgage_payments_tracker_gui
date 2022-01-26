import React, { useState } from 'react';

const usePublicHomePage = () => {
    const [showDemoCard, setShowDemoCard] = useState(true)
    const [userCode, setUserCode] = useState('')
    const [userValue, setUserValue] = useState('')
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [genCodeLoading, setGenCodeLoading] = useState(false);
    const [timeoutNum, setTimeoutNum] = useState(2000);


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
        genCodeLoading
    };
};

export default usePublicHomePage;
