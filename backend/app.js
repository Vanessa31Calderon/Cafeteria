// Archivo principal del backend de la Cafetería
// Programadora: Vanessa Noemí Calderón Beltrán
// Descripción: Configurar el servidor express, defiir rutas para login y CRUD de reservaciones.

// Importación de módulos necesarios
const express = require('express'); // Framework para servidor web
const cors = require('cors'); // Permite solicitudes de diferentes orígenes
const Login = require('./modelos/login'); // Modelo del login
const CRUD = require('./modelos/CRUD'); // Modelo para operaciones CRUD
const sequelize = require('./conexion'); // Configuración de la base de datos

const app = express(); // Inicializa la aplicación express
const puerto = 3000; // Puerto donde corre el servidor

app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite recibir JSON en las peticiones

// Ruta de login: verifica credenciales de usuario
app.post('/api/login', async (req, res) => {
  try {
    const { no_Empleado, contraseña } = req.body;
    const user = await Login.findOne({ where: { no_Empleado, contraseña } });
    if (user) {
      res.json({ success: true, message: '¡Bienvenido!' });
    } else {
      res.json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno en login', detalle: error.message });
  }
});

// Ruta para obtener todos los registros de CRUD (reservaciones)
app.get('/read/CRUD', async (req, res) => {
  try {
    const registros = await CRUD.findAll();
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
});

// Ruta para crear un nuevo registro en CRUD (reservación)
app.post('/create/CRUD', async (req, res) => {
    try {
        const { nombreCliente, numeroPersonas, numeroMesa, fechaReservacion, horaReservacion, informacionContacto } = req.body;

        const data = await CRUD.create({
            nombreCliente,
            numeroPersonas,
            numeroMesa,
            fechaReservacion,
            horaReservacion,
            informacionContacto
        });

        res.status(201).send(data);
    } catch (error) {
        console.error("Error al crear registro:", error);
        res.status(500).send({ error: "Error al crear el registro" });
    }
});

// Ruta para actualizar un registro en CRUD por folio
app.put('/update/CRUD/:folio', async (req, res) => {
  const { folio } = req.params;
  try {
    const registro = await CRUD.findByPk(folio);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    await registro.update(req.body);
    res.json(registro);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
});

// Ruta para eliminar un registro en CRUD por folio
app.delete('/delete/CRUD/:folio', async (req, res) => {
  const { folio } = req.params;
  try {
    const registro = await CRUD.findByPk(folio);
    if (!registro) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    await registro.destroy();
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
});

// Ruta para buscar un registro por folio
app.get('/read/CRUD/:folio', async (req, res) => {
  try {
    const { folio } = req.params;
    const registro = await CRUD.findByPk(folio);
    if (registro) {
      res.json(registro);
    } else {
      res.status(404).json({ error: 'No encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el registro' });
  }
});

// Inicia el servidor y muestra mensaje en consola
app.listen(puerto, () => {
  console.log(`Servidor backend corriendo en http://localhost:${puerto}`);
});