import './paginaAgregar.css';
import logoCafe from './assets/logodeCafe.png';
import iconInicio from './assets/inicio.png';
import iconAgregar from './assets/agregar.png';
import iconBuscar from './assets/buscar.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PaginaAgregar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCliente: '',
    numeroPersonas: '',
    numeroMesa: '',
    fechaReservacion: '',
    horaReservacion: '',
    informacionContacto: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/create/CRUD', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Reservación creada exitosamente');
        setFormData({
          nombreCliente: '',
          numeroPersonas: '',
          numeroMesa: '',
          fechaReservacion: '',
          horaReservacion: '',
          informacionContacto: '',
        });
      } else {
        alert('Error al crear la reservación');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="agregar-bg">
      <aside className="agregar-sidebar">
        <div style={{ marginTop: "250px" }}></div>
        <div
          className="agregar-sidebar-icon"
          onClick={() => navigate('/paginaInicio')}
          style={{ cursor: 'pointer' }}
        >
          <img src={iconInicio} alt="Inicio" style={{ width: 40, height: 40 }} />
        </div>
        <div className="agregar-sidebar-divider"></div>
        <div className="agregar-sidebar-icon">
          <img src={iconAgregar} alt="Agregar" style={{ width: 40, height: 40 }} />
        </div>
        <div className="agregar-sidebar-divider"></div>
        <div
          className="agregar-sidebar-icon"
          onClick={() => navigate('/paginaBuscar')}
          style={{ cursor: 'pointer' }}
        >
          <img src={iconBuscar} alt="Buscar" style={{ width: 40, height: 40 }} />
        </div>
      </aside>
      <main className="agregar-main">
        <div className="agregar-header">
          <h1 className="agregar-title">Nueva Reservación</h1>
          <img src={logoCafe} alt="El Tintineo" className="agregar-logo" />
        </div>
        <form className="agregar-form-reserva" onSubmit={handleSubmit}>
          <input
            className="agregar-input-reserva"
            type="text"
            name="nombreCliente"
            placeholder="Nombre del cliente:"
            value={formData.nombreCliente}
            onChange={handleChange}
          />
          <div className="agregar-form-row">
            <input
              className="agregar-input-reserva"
              type="text"
              name="numeroPersonas"
              placeholder="Num. Personas"
              value={formData.numeroPersonas}
              onChange={handleChange}
            />
            <input
              className="agregar-input-reserva"
              type="text"
              name="numeroMesa"
              placeholder="No. Mesa:"
              value={formData.numeroMesa}
              onChange={handleChange}
            />
          </div>
          <div className="agregar-form-row">
            <input
              className="agregar-input-reserva"
              type="text"
              name="fechaReservacion"
              placeholder="Fecha de reservación:"
              value={formData.fechaReservacion}
              onChange={handleChange}
            />
            <input
              className="agregar-input-reserva"
              type="text"
              name="horaReservacion"
              placeholder="Hora de reservación:"
              value={formData.horaReservacion}
              onChange={handleChange}
            />
          </div>
          <input
            className="agregar-input-reserva"
            type="text"
            name="informacionContacto"
            placeholder="Información de contacto:"
            value={formData.informacionContacto}
            onChange={handleChange}
          />
          <button className="agregar-btn-reserva" type="submit">Agendar</button>
        </form>
      </main>
      <footer className="login-footer">
        Copyright © 2025 El Tintineo. Todos los derechos reservados.
      </footer>
    </div>
  );
}