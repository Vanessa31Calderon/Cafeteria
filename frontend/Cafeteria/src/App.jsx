import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logoCafe from './assets/logodeCafe.png'; 
import personaLogin from './assets/personaLogin.png';

/**
 * Componente principal de la aplicación de inicio de sesión.
 * 
 * - Permite a los empleados ingresar su número de empleado y contraseña.
 * - Valida las credenciales con el backend.
 * - Si son correctas, redirige a la página principal.
 * - Si son incorrectas, muestra un mensaje de error.
 * - Incluye estilos e imágenes para una mejor experiencia visual.
 */
function App() {
  // Estado para el número de empleado
  const [empleado, setEmpleado] = useState('');
  // Estado para la contraseña
  const [password, setPassword] = useState('');
  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');
  // Hook para navegación programática
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Realiza una petición POST al backend con las credenciales.
   * Si la autenticación es exitosa, navega a la página de inicio.
   * Si falla, muestra un mensaje de error.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          no_Empleado: empleado,  
          contraseña: password    
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        navigate('/paginaInicio');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  }

  return (
    // Contenedor principal con fondo personalizado
    <div className="login-bg">
      <div className="center-content">
        <div className="login-container">
          {/* Encabezado con ícono de usuario y título */}
          <div className="login-header">
            <div className="icon-user">
              <img
                src={personaLogin}
                alt="Usuario"
                style={{
                  width: 155,
                  height: 155,
                  borderRadius: "20px",
                  background: "#fff",
                  objectFit: "contain",
                  border: "1px solid #a89c94",
                  padding: "4px"
                }}
              />
            </div>
            <div className="login-title">
              <span className="brand">E L &nbsp; T I N T I N E O</span>
              <div className="login-subtitle">
                <b>Inicio de Sesión</b>
                <br />
                <b>EMPLEADOS</b>
              </div>
            </div>
          </div>
          {/* Formulario de inicio de sesión */}
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="No. Empleado Cafesito:"
              className="login-input"
              value={empleado}
              onChange={e => setEmpleado(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña:"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">
              Iniciar sesión
            </button>
            {/* Mensaje de error si las credenciales son incorrectas */}
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          </form>
        </div>
        {/* Logo de la cafetería */}
        <div className="logo-circle">
          <img src={logoCafe} alt="logo" style={{ width: 150, height: 150, borderRadius: "50%", background: "#d9d9d9", objectFit: "contain" }} />
        </div>
      </div>
      {/* Pie de página */}
      <footer className="login-footer">
        Copyright © 2025 El Tintineo. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default App
