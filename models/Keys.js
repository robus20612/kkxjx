const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    expiration: { type: Date, required: true },
});

// Agrega un índice para eliminar automáticamente claves expiradas
KeySchema.index({ expiration: 1 }, { expireAfterSeconds: 0 });

const Key = mongoose.model('Key', KeySchema);
module.exports = Key;
