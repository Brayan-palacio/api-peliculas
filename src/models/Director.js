const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    names: {
        type: String,
        required: [true, 'Los nombres del director son obligatorios'],
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Director', directorSchema);