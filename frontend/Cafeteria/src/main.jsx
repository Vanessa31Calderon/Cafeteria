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
        <Route path="/" element={<App />} />
        <Route path="/paginaInicio" element={<PaginaInicio />} />
        <Route path="/paginaAgregar" element={<PaginaAgregar />} />
        <Route path="/paginaBuscar" element={<PaginaBuscar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
