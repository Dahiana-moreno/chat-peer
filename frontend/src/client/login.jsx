
import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../authentication/AuthContext';
import '../css/formUser.css'
const Login = () => {

  const uriBack = import.meta.env.VITE_URL_BACK;

  const [password_user, setPassword] = useState('')
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate()

  
  const LoginUser = async (e) => {
    e.preventDefault();
    
    // Verificar si ambos campos están llenos antes de hacer la solicitud
    if (!password_user || !email) {
      setError('Por favor, complete todos los campos correctamente.');
      return;
    }
  
    try {
      // Enviar solicitud de login
      const responseUri = await axios.post(`https://chat-peer2-production.up.railway.app/convert/login?password_user=${password_user}&email=${email}`);
      
      // Verificar si el token está presente en la respuesta
      const token = responseUri.data.token;
      if (!token) {
        throw new Error('Token no recibido. Verifique la respuesta del servidor.');
      }
  
      console.log('Token recibido:');
      
      // Almacenar el token en localStorage
      localStorage.setItem('token', token);
      
      // Ejecutar la función de login con el token
      login(token);
      
      // Navegar a la página "/convert"
      navigate('/convert');
  
    } catch (error) {
      // Mostrar error completo en consola para depuración
      console.error('Error en login:', error);
      
      // Mostrar un mensaje de error al usuario
      setError('Error al intentar iniciar sesión. Verifique sus credenciales.');
    }
  };
  

return(
  <>
 <div className='space container'>
  <form onSubmit={LoginUser}>
    
  <div className="containerForm">
  <h3>Currency</h3>
  <div className="form-group space">
  <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Correo electrico" />
  </div>
  <div className="form-group space">
  <input className='form-control' value={password_user} onChange={ (e) => setPassword(e.target.value)} type="text" placeholder="Contraseña"/>
  </div>
  <div className=''>
  <button className=' btn btn-primary space' id='submitBotton' type='submit'>Entrar</button>
  </div>
  
  </div>
  <br />
  <div className='form-group containerForm'>
    ¿No tienes cuenta? <a href="/register">Registrate</a>
    
  </div>
  </form>
  {error && <div className='alert alert-danger mt-3'>{error}</div>}
  </div>
  </>
)
}
export default Login;