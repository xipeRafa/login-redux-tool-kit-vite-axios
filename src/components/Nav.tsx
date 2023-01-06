import { useAuth} from "../hooks/useAuth"


export const Nav = () => {

  const { startLogout, user } = useAuth();

 console.log(user.nombre)

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.nombre }
        </span>

        <button className="btn btn-outline-danger" onClick={ startLogout }>
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>
    </div>
  )
}
