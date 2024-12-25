const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Key = require('./models/Key');

const app = express();
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI; // Conexión a MongoDB desde variables de entorno

// Conexión a MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// Ruta para validar claves
app.post('/validate-key', async (req, res) => {
    const { key } = req.body;

    if (!key) {
        return res.status(400).send({ success: false, message: 'La clave es requerida' });
    }

    const validKey = await Key.findOne({ key });
    if (!validKey) {
        return res.status(400).send({ success: false, message: 'Clave inválida' });
    }

    if (new Date() > validKey.expiration) {
        return res.status(400).send({ success: false, message: 'La clave ha expirado' });
    }

    res.send({ success: true, message: 'Clave válida' });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
