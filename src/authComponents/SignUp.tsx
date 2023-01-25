


import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import {useForm} from '../helpers';
import './login.css';

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}



export const SignUp = ({ startRegister, status }) => {



    const { registerEmail, registerName, registerPassword, registerPassword2, 
            onInputChange: onRegisterInputChange } = useForm(registerFormFields);




    const registerSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if( registerEmail==='' || registerName==='' || registerPassword==='' || registerPassword2==='' ){
            Swal.fire('Campo vacio', 'llenar todo por favor', 'error');
            return
        }

        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }  

        startRegister({ nombre: registerName, correo: registerEmail, password: registerPassword });
        
    }




    return (
        
        <div className="container login-container">
            { status === 'not-authenticated' &&
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>

                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>

                    <Link to="/auth/login">Login</Link>

                </div>
            </div>}
        </div>
    )
}