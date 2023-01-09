
import { useEffect, useState } from 'react'; 
import { Navigate, Route, Routes, } from 'react-router-dom';

import { Login } from '../auth/Login';
import { SignUp } from '../auth/SignUp';
import { Nav } from '../components/Nav'

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
// 
    return (
        <><Nav />
        <Routes>
            {
                status === 'not-authenticated'
                    ? <>
                        <Route path="/api/auth/login" element={<Login />} />
                        <Route path="/api/usuarios" element={<SignUp />} />
                        <Route path="/*" element={<Navigate to="/api/auth/login" />} />
                    </>
                    : <>
                        
                        
                        <Route path="/img1" element={<p> ------ imagen1 uno uno uno uno uno</p>} />
                        <Route path="/img2" element={<p> ------ imagen2 dos dos dos dos dos</p>} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                
              
            }
        </Routes>
        </>
    )
}

export default AppRouter

  {/*      */}