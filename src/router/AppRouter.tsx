
import { useEffect } from 'react'; 
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login, SignUp, Nav } from '../authComponents';
import { Users, Productos, Categorias } from '../components';
import { useAuth } from '../hooks/useAuth';


const AppRouter = () => {

    const { status,  checkLogin,  startLogin, errorMessage, 
        startRegister,startLogout, user,  } = useAuth();

    console.log('status:', status)


    useEffect(() => {
        checkLogin();
    }, []) 


    if (status === 'checking') {
        return <h3>Cargando...</h3>
    }


    return (
        <div>
            <Nav startLogout={startLogout} user={user} status={status}/>
        <Routes>
            <Route path="/auth/login"    element={<Login  startLogin={startLogin}       errorMessage={errorMessage} />} />
            <Route path="/auth/register" element={<SignUp startRegister={startRegister} errorMessage={errorMessage} />} />

            <Route path="/categorias" element={<Categorias />} />
            <Route path="/users"      element={<Users />} />
            <Route path="/productos"  element={<Productos />} />

            <Route path="/*" element={<Navigate to="/auth/login" />} /> 
        </Routes>
        </div>
    )
}

export default AppRouter

