const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del género es obligatorio'],
        unique: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true // true = Activo, false = Inactivo
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // createdAt y updatedAt automáticos
});

module.exports = mongoose.model('Genre', genreSchema);