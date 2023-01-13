import axios from 'axios';

import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()



const axiosApi = axios.create({
    baseURL: VITE_API_URL
});


/* (async () => {
    const { data } = await axiosApi.get('/usuarios')
    console.log('usuarios Registrados', data)
})()  */



// Todo: configurar interceptores
axiosApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'token': localStorage.getItem('token')
    }

    return config;
})


export default axiosApi;
