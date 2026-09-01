require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

// Importar rutas
const genreRoutes = require('./src/routes/genre.routes');
const directorRoutes = require('./src/routes/director.routes');
const producerRoutes = require('./src/routes/producer.routes');
const typeRoutes = require('./src/routes/type.routes');
const mediaRoutes = require('./src/routes/media.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES
// ==========================================
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

// ==========================================
// RUTA RAÍZ Y ESTADO
// ==========================================
app.get('/', (req, res) => {
    res.json({
        mensaje: '🎬 API REST de Películas y Series funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            generos: '/api/genres',
            directores: '/api/directors',
            productoras: '/api/producers',
            tipos: '/api/types',
            media: '/api/media'
        }
    });
});

// ==========================================
// RUTAS DE LA API
// ==========================================
app.use('/api/genres', genreRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/producers', producerRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/media', mediaRoutes);

// ==========================================
// MANEJO DE ERRORES Y RUTAS NO ENCONTRADAS
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        mensaje: `Ruta no encontrada: ${req.method} ${req.url}`
    });
});

app.use((err, req, res, next) => {
    console.error('❌ Error no controlado:', err);
    res.status(500).json({
        status: 500,
        mensaje: 'Error interno del servidor',
        error: err.message
    });
});

// ==========================================
// INICIALIZACIÓN DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log('📚 Conexión a MongoDB Atlas establecida');
    console.log('📋 Endpoints disponibles:');
    console.log('   • GET/POST/PUT/DELETE  /api/genres');
    console.log('   • GET/POST/PUT/DELETE  /api/directors');
    console.log('   • GET/POST/PUT/DELETE  /api/producers');
    console.log('   • GET/POST/PUT/DELETE  /api/types');
    console.log('   • GET/POST/PUT/DELETE  /api/media');
});

module.exports = app;