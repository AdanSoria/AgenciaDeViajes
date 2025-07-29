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
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

// Esquema de datos
const Formulario = mongoose.model('Formulario', {
  email: String,
  asunto: String,
  telefono: String,
  mensaje: String
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

// Iniciar servidor
app.listen(3000, () => {
  console.log('🚀 Servidor en http://localhost:3000');
});
