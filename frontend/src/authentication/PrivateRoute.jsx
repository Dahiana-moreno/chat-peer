import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

 const PrivateRoute = ({ children}) => {
  const {userId} = useAuth();

    // Si el estado de userId es null, esperamos a que cargue
    if (userId === null) {
      return <div>..Loading</div>
    }
    
  return userId ? children : <Navigate to="/login" />
};
export default PrivateRoute