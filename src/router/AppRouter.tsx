
import { useEffect } from 'react'; 
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login, SignUp} from '../authComponents';
import { Users, Productos, Categorias } from '../components';
import { useAuth } from '../hooks/useAuth';

import Swal from 'sweetalert2';
import { Nav } from '../cmpsPartial';


const AppRouter = () => {


    const { status,  checkLogin,  startLogin, startRegister,startLogout, 
            user, sweetAlertMessage, defaultAlert } = useAuth();

    console.log('status Router:', status)



    useEffect(() => {
        if (sweetAlertMessage !== undefined) {
           Swal.fire(sweetAlertMessage[0], sweetAlertMessage[1], sweetAlertMessage[2]);
           defaultAlert()
       } 
       console.log('sweetAlertMessage', sweetAlertMessage)
    }, [sweetAlertMessage]) 


 
  /*   useEffect(() => {
        checkLogin();
    }, [])  

 
    if (status === 'checking') {
        return <h3>Cargando...</h3>
    }  */
 





    return (
        <div>
            <Nav startLogout={startLogout} user={user} status={status} />
            <Routes>
                <Route path="/auth/login"    element={<Login  startLogin={startLogin}       status={status} />} />
                <Route path="/auth/register" element={<SignUp startRegister={startRegister} status={status} />} />

                <Route path="/categorias" element={<Categorias />} />
                <Route path="/users"      element={<Users      />} />
                <Route path="/productos"  element={<Productos  />} />

                <Route path="/*" element={<Navigate to="/auth/login" />} /> 
            </Routes>
        </div>
    )
}

export default AppRouter

