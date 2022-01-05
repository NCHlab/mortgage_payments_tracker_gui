const AXIOS_CONFIG = {
    baseURL: 'http://localhost:4004/api/v1',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
}

export { AXIOS_CONFIG };