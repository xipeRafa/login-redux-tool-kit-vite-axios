import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/authSlice'
import axiosApi from '../api/api';

export const useAuth = () => {

    const { status, user, errorMessage } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();


    function saveLsData(DATA: { usuario: { nombre: string; uid: string; }; token: string; }){
        localStorage.setItem('userName', DATA.usuario.nombre);
        localStorage.setItem('userId', DATA.usuario.uid);
        localStorage.setItem('token', DATA.token);
        localStorage.setItem('token-init-date', new Date().getTime());
    }


    const startLogin = async ({ correo, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await axiosApi.post('/auth/login', { correo, password });
            console.log('data:', data)
            saveLsData(data)
            dispatch(onLogin({ nombre: data.usuario.nombre, uid: data.usuario.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    }


    const startRegister = async ({ nombre, correo, password}) => {
        console.log('try Register', nombre, correo, password)
        dispatch(onChecking());
        try {
            const { data } = await axiosApi.post('/usuarios', { nombre, correo, password }); //post 
            saveLsData(data)
            dispatch(onLogin({ nombre: data.usuario.nombre, uid: data.usuario.uid }));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--nooooo'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    }


     const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
         if (!token) return dispatch(onLogout()); 

         const nombreLS = localStorage.getItem('userName');
            const uidLS = localStorage.getItem('userId');
        try {
            localStorage.setItem('token', token);
            dispatch(onLogin({ nombre: nombreLS, uid: uidLS }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    } 


    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
       checkAuthToken, 
        startLogin,
        startLogout,
        startRegister,
    }

}