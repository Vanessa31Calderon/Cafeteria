const express = require('express'); // Primero requiere express
const cors = require('cors');
const Login = require('./modelos/login');
const CRUD = require('./modelos/CRUD');
const sequelize = require('./conexion');

const app = express(); // Luego crea la app
const puerto = 3000; 

app.use(cors());
app.use(express.json());

// Ruta de login   
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


// Ruta para obtener todos los registros de CRUD
app.get('/read/CRUD', async (req, res) => {
  try {
    const registros = await CRUD.findAll();
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
});
// Ruta para crear un nuevo registro en CRUD
app.post('/create/CRUD', async (req, res) => {
    try {
        const { nombreCliente, numeroPersonas, numeroMesa, fechaReservacion, horaReservacion, informacionContacto } = req.body;

        const data = await CRUD.create({
            nombreCliente,
            numeroPersonas,
            numeroMesa,
            fechaReservacion,
            horaReservacion,
            informacionContacto // ← Este estaba mal escrito
        });

        res.status(201).send(data);
    } catch (error) {
        console.error("Error al crear registro:", error);
        res.status(500).send({ error: "Error al crear el registro" });
    }
});


// Ruta para actualizar un registro en CRUD
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
// Ruta para eliminar un registro en CRUD
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

// Ruta para buscar por ID (folio)
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



// Inicia el servidor
app.listen(puerto, () => {
  console.log(`Servidor backend corriendo en http://localhost:${puerto}`);
});