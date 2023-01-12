import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/slices/authSlice'
import { useLocation } from 'react-router-dom';
import axiosApi from '../api/api';

export const useAuth = () => {
    let location = useLocation();

    const { status, user, errorMessage } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();


    function saveLsData(DATA: { usuario: { nombre: string; uid: string; }; token: string; }){
        localStorage.setItem('userName', DATA.usuario.nombre);
        localStorage.setItem('token', DATA.token);
        localStorage.setItem('token-init-date', new Date().getTime());
    }


    const startLogin = async ({ correo, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await axiosApi.post('/auth/login', { correo, password });
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
            console.log(data)
            dispatch(onLogin({ nombre: data.usuario.nombre, uid: data.usuario.uid }));
        } catch (error) {
            console.log('errorRegister :>> ', error);
            console.log('error.response.data?.msg :>> ', error.response.data?.msg);
            console.log('error.response.data.errors[0] :>> ', error.response.data.errors[0]);
            console.log('error.response.data.errors[1] :>> ', error.response.data.errors[1]);
            console.log('error.response.data.errors[2] :>> ', error.response.data.errors[2]);

            console.log('error.response.data.errors :>> ', error.response.data.errors);

            dispatch(onLogout(error.response.data.errors[0] || '--- useAuth'));
            /* setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 30000); */
        }
    }


     const checkLogin = async () => {
        const token = localStorage.getItem('token');
        if (!token){ 
            location.pathname = '/api/auth/login'
            return dispatch(onLogout())
        }
        
        try {
            const { data } = await axiosApi.get('auth/renew');
            dispatch(onLogin({ nombre: data.nombre, uid: data.uid }));
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
        //* estado
        errorMessage,
        status,
        user,

        //* Métodos
        checkLogin, 
        startLogin,
        startLogout,
        startRegister,
    }

}