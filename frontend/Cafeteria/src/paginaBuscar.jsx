import './paginaBuscar.css';
import logoCafe from './assets/logodeCafe.png';
import iconInicio from './assets/inicio.png';
import iconAgregar from './assets/agregar.png';
import iconBuscar from './assets/buscar.png';
import iconEdit from './assets/editar.png';
import iconDelete from './assets/eliminar.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PaginaBuscar() {
  const navigate = useNavigate();
  const [folio, setFolio] = useState('');
  const [detalle, setDetalle] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [editando, setEditando] = useState(false);
  const [formEdit, setFormEdit] = useState({});

  const handleBuscar = async (e) => {
    e.preventDefault();
    setMensaje('');
    setDetalle(null);
    if (!folio) {
      setMensaje('Ingresa el folio');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/read/CRUD/${folio}`);
      if (response.ok) {
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
          setMensaje('No se encontró la reservación');
        } else {
          setDetalle(data);
        }
      } else {
        setMensaje('No se encontró la reservación');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  const handleEditar = () => {
    setEditando(true);
    setFormEdit(detalle);
  };

  const handleInputEdit = (e) => {
    const { name, value } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/update/CRUD/${folio}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEdit),
      });
      if (response.ok) {
        setDetalle(formEdit);
        setEditando(false);
        setMensaje('Reservación actualizada');
      } else {
        setMensaje('Error al actualizar');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar esta reservación?')) return;
    try {
      const response = await fetch(`http://localhost:3000/delete/CRUD/${folio}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setDetalle(null);
        setFolio('');
        setMensaje('Reservación eliminada');
      } else {
        setMensaje('Error al eliminar');
      }
    } catch {
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="buscar-container">
      <div className="buscar-bg">
        <aside className="buscar-sidebar">
          <div style={{ marginTop: "250px" }}></div>
          <div
            className="buscar-sidebar-icon"
            onClick={() => navigate('/paginaInicio')}
            style={{ cursor: 'pointer' }}
          >
            <img src={iconInicio} alt="Inicio" style={{ width: 40, height: 40 }} />
          </div>
          <div className="buscar-sidebar-divider"></div>
          <div
            className="buscar-sidebar-icon"
            onClick={() => navigate('/paginaAgregar')}
            style={{ cursor: 'pointer' }}
          >
            <img src={iconAgregar} alt="Agregar" style={{ width: 40, height: 40 }} />
          </div>
          <div className="buscar-sidebar-divider"></div>
          <div className="buscar-sidebar-icon">
            <img src={iconBuscar} alt="Buscar" style={{ width: 40, height: 40 }} />
          </div>
        </aside>
        <main className="buscar-main">
          <div className="buscar-header">
            <h1 className="buscar-title">Buscar Reservación por ID</h1>
            <img src={logoCafe} alt="El Tintineo" className="buscar-logo" />
          </div>
          <form className="buscar-barra-busqueda" onSubmit={handleBuscar}>
            <input
              className="buscar-input"
              type="number"
              placeholder="Ingresa el folio..."
              value={folio}
              onChange={e => setFolio(e.target.value)}
            />
            <button className="buscar-btn-buscar" type="submit">
              <img src={iconBuscar} alt="Buscar" />
            </button>
          </form>
          {mensaje && <div style={{ color: 'red', marginTop: 10 }}>{mensaje}</div>}
          {detalle && (
            <>
              <form className="buscar-form-reserva" onSubmit={editando ? handleGuardar : e => e.preventDefault()}>
                <div className="buscar-form-group">
                  <label className="buscar-label">Nombre del cliente:</label>
                  <input
                    className="buscar-input"
                    type="text"
                    name="nombreCliente"
                    value={editando ? formEdit.nombreCliente : detalle.nombreCliente || ''}
                    onChange={editando ? handleInputEdit : undefined}
                    readOnly={!editando}
                  />
                </div>
                <div className="buscar-form-row">
                  <div className="buscar-form-group">
                    <label className="buscar-label">Num. Personas:</label>
                    <input
                      className="buscar-input"
                      type="text"
                      name="numeroPersonas"
                      value={editando ? formEdit.numeroPersonas : detalle.numeroPersonas || ''}
                      onChange={editando ? handleInputEdit : undefined}
                      readOnly={!editando}
                    />
                  </div>
                  <div className="buscar-form-group">
                    <label className="buscar-label">No. Mesa:</label>
                    <input
                      className="buscar-input"
                      type="text"
                      name="numeroMesa"
                      value={editando ? formEdit.numeroMesa : detalle.numeroMesa || ''}
                      onChange={editando ? handleInputEdit : undefined}
                      readOnly={!editando}
                    />
                  </div>
                </div>
                <div className="buscar-form-row">
                  <div className="buscar-form-group">
                    <label className="buscar-label">Fecha de reservación:</label>
                    <input
                      className="buscar-input"
                      type="text"
                      name="fechaReservacion"
                      value={editando ? formEdit.fechaReservacion : detalle.fechaReservacion || ''}
                      onChange={editando ? handleInputEdit : undefined}
                      readOnly={!editando}
                    />
                  </div>
                  <div className="buscar-form-group">
                    <label className="buscar-label">Hora de reservación:</label>
                    <input
                      className="buscar-input"
                      type="text"
                      name="horaReservacion"
                      value={editando ? formEdit.horaReservacion : detalle.horaReservacion || ''}
                      onChange={editando ? handleInputEdit : undefined}
                      readOnly={!editando}
                    />
                  </div>
                </div>
                <div className="buscar-form-group">
                  <label className="buscar-label">Información de contacto:</label>
                  <input
                    className="buscar-input"
                    type="text"
                    name="informacionContacto"
                    value={editando ? formEdit.informacionContacto : detalle.informacionContacto || ''}
                    onChange={editando ? handleInputEdit : undefined}
                    readOnly={!editando}
                  />
                </div>
                <div className="buscar-acciones-reserva" style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: '32px' }}>
                  {!editando && (
                    <>
                      <button type="button" onClick={handleEditar} className="boton-accion">
                        <img src={iconEdit} alt="Editar" /> Editar
                      </button>
                      <button type="button" onClick={handleEliminar} className="boton-accion">
                        <img src={iconDelete} alt="Eliminar" /> Eliminar
                      </button>
                    </>
                  )}
                  {editando && (
                    <button type="submit" className="boton-accion">
                      <img src={iconEdit} alt="Guardar" /> Guardar
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </main>
      </div>
      <footer className="login-footer">
        Copyright © 2025 El Tintineo. Todos los derechos reservados.
      </footer>
    </div>
  );
}