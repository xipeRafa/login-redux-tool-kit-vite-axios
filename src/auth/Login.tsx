import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth, } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import './login.css';
import { Link } from 'react-router-dom';

type loginFormFields = {
    loginEmail: String,
    loginPassword: String,
}

const loginFormFields:loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}


export const Login = () => {

    const { startLogin, errorMessage } = useAuth();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

    const loginSubmit = (event: any) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage])




    return (
        <div className="container login-container">
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

                    <Link to="/register">Register</Link>

                </div>
            </div>
        </div>
    )
}