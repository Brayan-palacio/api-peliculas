const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: [true, 'El serial es obligatorio'],
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    synopsis: {
        type: String,
        required: [true, 'La sinopsis es obligatoria'],
        trim: true
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true,
        trim: true
    },
    coverImage: {
        type: String,
        required: [true, 'La imagen de portada es obligatoria'],
        trim: true
    },
    releaseYear: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio']
    },

    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: [true, 'El género es obligatorio']
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: [true, 'El director es obligatorio']
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer',
        required: [true, 'La productora es obligatoria']
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: [true, 'El tipo es obligatorio']
    }
}, {
    timestamps: true
});


mediaSchema.index({ title: 'text', synopsis: 'text' });

module.exports = mongoose.model('Media', mediaSchema);