/**
 * Punto de entrada principal de la aplicación React.
 * 
 * - Configura el enrutamiento de la aplicación usando react-router-dom.
 * - Define las rutas principales: inicio de sesión, página de inicio, agregar y buscar.
 * - Importa los estilos globales.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PaginaInicio from './paginaInicio.jsx'
import PaginaAgregar from './paginaAgregar.jsx'
import PaginaBuscar from './paginaBuscar.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta para la pantalla de inicio de sesión */}
        <Route path="/" element={<App />} />
        {/* Ruta para la página principal después de iniciar sesión */}
        <Route path="/paginaInicio" element={<PaginaInicio />} />
        {/* Ruta para agregar elementos */}
        <Route path="/paginaAgregar" element={<PaginaAgregar />} />
        {/* Ruta para buscar elementos */}
        <Route path="/paginaBuscar" element={<PaginaBuscar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
