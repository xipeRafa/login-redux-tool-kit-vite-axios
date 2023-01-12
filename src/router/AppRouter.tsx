
import { useEffect, useState } from 'react'; 
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '../auth/Login';
import { SignUp } from '../auth/SignUp';

import { Users } from '../components/Users';
import { Productos } from '../components/Productos';

import { useAuth } from '../hooks/useAuth';


const AppRouter = () => {

    const { status,  checkLogin } = useAuth();
    console.log('status:', status)
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    useEffect(() => {
        checkLogin();
    }, []) 


    if (status === 'checking') {
        return <h3>Cargando...</h3>
    }


    return (

        <Routes>
            <Route path="/api/auth/login" element={<Login />} />
            <Route path="/api/usuarios" element={<SignUp />} />

            <Route path="/users" element={<Users />} />
            <Route path="/productos" element={<Productos />} />
             <Route path="/*"   element={<Navigate to="api/auth/login" />} /> 
        </Routes>
    )
}

export default AppRouter

