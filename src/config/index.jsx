const AXIOS_CONFIG = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 4000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
}

export { AXIOS_CONFIG };