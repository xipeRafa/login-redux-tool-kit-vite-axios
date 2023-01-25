
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { useForm } from '../helpers';
import './login.css';

type loginFormFields = {
    loginEmail: String,
    loginPassword: String,
}

const loginFormFields:loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}


export const Login = ({ startLogin, status }) => {


    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);



    
    const loginSubmit = (event: any) => {
        event.preventDefault();
 
        if( loginEmail==='' || loginPassword==='' ){
            Swal.fire('Campo vacio', 'llenar todo por favor', 'error');
            return
        }  

        startLogin({ correo: loginEmail, password: loginPassword });
         
    }


    return (
        <div className="container login-container">
            {status === 'not-authenticated' &&
            <div className="row">
                <div className="col-md-6 login-form-1">

                    <h3>Ingreso</h3>

                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input type="submit" className="btnSubmit" value="Login" />
                        </div>
                    </form>

                    <Link to="/auth/register">Register</Link>

                </div>
            </div>}
        </div>
    )
}