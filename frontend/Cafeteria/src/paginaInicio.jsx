import './paginaInicio.css';
import logoCafe from './assets/logodeCafe.png';
import cafeFoto from './assets/cafeimagen.jpg';
import iconInicio from './assets/inicio.png';
import iconAgregar from './assets/agregar.png';
import iconBuscar from './assets/buscar.png';
import { useNavigate } from 'react-router-dom';

export default function PaginaInicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-bg">
      <aside className="sidebar">
        <div style={{ marginTop: "250px" }}></div> 
        <div className="sidebar-icon">
          <img src={iconInicio} alt="Inicio" style={{ width: 40, height: 40 }} />
        </div>
        <div className="sidebar-divider"></div>
        <div
          className="sidebar-icon"
          onClick={() => navigate('/paginaAgregar')} 
          style={{ cursor: 'pointer' }}
        >
          <img src={iconAgregar} alt="Agregar" style={{ width: 40, height: 40 }} />
        </div>
        <div className="sidebar-divider"></div>
        <div className="sidebar-icon"
          onClick={() => navigate('/paginaBuscar')}
          style={{ cursor: 'pointer' }}
        >
          <img src={iconBuscar} alt="Buscar" style={{ width: 40, height: 40 }} />
        </div>
      </aside>
      <main className="inicio-main">
        <div className="inicio-header">
          <h1 className="inicio-title">Inicio</h1>
          <img src={logoCafe} alt="El Tintineo" className="inicio-logo" />
        </div>
        <div className="inicio-content">
          <p>
            Aquí no solo servimos café. Creamos momentos, sembramos sonrisas y dejamos huella en los pequeños detalles.
          </p>
          <p className="inicio-destacado">
            <b>Tú eres parte de eso.<br />Tú eres parte de la magia.</b>
          </p>
          <div className="inicio-foto">
            <img src={cafeFoto} alt="Café" />
          </div>
          <p>
            Gracias por poner el corazón en cada jornada.<br />
            El tintinear de una taza también cuenta tu historia.
          </p>
          <p className="inicio-final">
            <b>Donde cada día es una nueva oportunidad para hacer sentir a alguien como en casa.</b>
          </p>
        </div>
      </main>
      <footer className="login-footer">
        Copyright © 2025 El Tintineo. Todos los derechos reservados.
      </footer>
    </div>
  );
}