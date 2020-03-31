import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        const requestInterceptor = httpClient.interceptors.request.use(req => {
            setError(null)
            return req;
        })
        const responseInterceptor =  httpClient.interceptors.response.use(res=>res, err => {
            setError(err)
        })
    
        useEffect(() => {
        return () => {  
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        }}, [])

        return [error, errorConfirmedHandler]
}