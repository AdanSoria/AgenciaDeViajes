const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión con MongoDB Atlas
mongoose.connect('mongodb+srv://bnarce:WmQ32m2fJM7quDBV@bncluster.fdlgi1p.mongodb.net/formularioDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB '))
.catch(err => console.error('❌ Error de conexión:', err));

// Esquema de datos
const Formulario = mongoose.model('Formulario', {
  email: String,
  asunto: String,
  telefono: String,
  mensaje: String
});

const Viaje = mongoose.model('Viaje', {
  paquete: String,
  duracion: String,
  ciudades: String,
  paises: [String],  
  precio: Number,
  aerolinea: String
});



// Ruta para recibir datos del formulario
app.post('/api/contacto', async (req, res) => {
  try {
    const nuevo = new Formulario(req.body);
    await nuevo.save();
    res.status(200).json({ mensaje: '✅ Formulario enviado y guardado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: '❌ Error al guardar en la base de datos.' });
  }
});
// Ruta para obtener todos los viajes
app.get('/api/viajes', async (req, res) => {
  try {
    const viajes = await Viaje.find();
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ error: '❌ Error al obtener viajes.' });
  }
});


// Iniciar servidor
app.listen(3000, () => {
  console.log('🚀 Servidor en http://localhost:3000');
});
