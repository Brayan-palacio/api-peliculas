const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la productora es obligatorio'],
        unique: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    slogan: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Producer', producerSchema);