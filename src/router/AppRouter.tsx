
import { useEffect } from 'react';
import { Navigate, Route, Routes, } from 'react-router-dom';

import { Login } from '../auth/Login';
import { SignUp } from '../auth/SignUp';
import { Nav } from '../components/Nav'

import { useAuth } from '../hooks/useAuth';


const AppRouter = () => {

    const { status, checkAuthToken } = useAuth();
    console.log('status:', status)
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === 'checking') {
        return <h3>Cargando...</h3>
    }
// 
    return (
        <Routes>
            {
                status === 'not-authenticated'
                    ? <>
                        <Route path="/auth/*" element={<Login />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
                    : <>
                        <Route path="/" element={<Nav />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
            }
        </Routes>
    )
}

export default AppRouter