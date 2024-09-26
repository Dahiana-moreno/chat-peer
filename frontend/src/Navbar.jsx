import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authentication/AuthContext"

const Navbar = () => {
  const { userId, logout} = useAuth();

  const navigate = useNavigate();
    
  const hadleLogout = ()=> {
    logout();
    navigate('/login')
  };


  return(
    <div className="navbarPrin navbara ">
    <nav className="navbar navbar-expand-lg">
      <Link to="/"></Link>
      {userId ? (
        <div className="space">
          <button className="btn btn-danger" onClick={hadleLogout}>Cerrar sesion</button>
        </div>
      ) : (
        <Link to="/login" >Login</Link>
      )}
    </nav>
    </div>
  )
}
export default Navbar