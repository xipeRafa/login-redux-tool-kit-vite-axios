import { useAuth} from "../hooks/useAuth"
import { Link } from 'react-router-dom';

export const Nav = () => {

  const { startLogout, user } = useAuth();

  return (
    <div className="navbar navbar-dark bg-black mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.nombre }
        </span>
        <span>
          <Link style={{color:"white"}} className='mx-5' to="/img1">img1</Link>
          <Link style={{color:"white"}} to="/img2">img2</Link>
        </span>

        <button className="btn btn-outline-danger" onClick={ startLogout }>
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>
    </div>
  )
}
