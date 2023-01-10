import { useAuth} from "../hooks/useAuth"
import { Link } from 'react-router-dom';

export const Nav = () => {

  const { startLogout, user, status } = useAuth();

  return (
    <div className="navbar navbar-dark bg-black mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.nombre }
        </span>

        {status === 'authenticated' &&
          <div>
            <span>
              <Link style={{color:"white"}}  to="/users">users</Link>
              <Link style={{color:"white"}} className='mx-5' to="/img2">img2</Link>
            </span>

            <Link className="btn btn-outline-danger" to="/api/auth/login" onClick={ startLogout }>
              <i className="fas fa-sign-out-alt"></i>salir
            </Link>
          </div>}
    </div>
  )
}
