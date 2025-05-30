import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logoCafe from './assets/logodeCafe.png'; 
import personaLogin from './assets/personaLogin.png';

function App() {
  const [empleado, setEmpleado] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div className="login-bg">
      <div className="center-content">
        <div className="login-container">
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
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          </form>
        </div>
        <div className="logo-circle">
          <img src={logoCafe} alt="logo" style={{ width: 150, height: 150, borderRadius: "50%", background: "#d9d9d9", objectFit: "contain" }} />
        </div>
      </div>
      <footer className="login-footer">
        Copyright © 2025 El Tintineo. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default App
