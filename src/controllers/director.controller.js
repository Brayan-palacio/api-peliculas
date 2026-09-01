const Director = require('../models/Director');

const getDirectors = async (req, res) => {
    try {
        const directors = await Director.find();
        res.json({
            status: 200,
            count: directors.length,
            data: directors
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener directores',
            error: error.message
        });
    }
};


const getActiveDirectors = async (req, res) => {
    try {
        const directors = await Director.find({ status: true });
        res.json({
            status: 200,
            count: directors.length,
            data: directors
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener directores activos',
            error: error.message
        });
    }
};


const createDirector = async (req, res) => {
    try {
        const names = req.body.names || req.body.name || req.body.nombre;

        if (!names) {
            return res.status(400).json({
                status: 400,
                message: 'Los nombres del director son obligatorios'
            });
        }

        const director = await Director.create({
            names: names.trim()
        });

        res.status(201).json({
            status: 201,
            message: 'Director creado exitosamente',
            data: director
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'Error al crear director',
            error: error.message
        });
    }
};


const updateDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const names = req.body.names || req.body.name || req.body.nombre;
        const { status } = req.body;

        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({
                status: 404,
                message: 'Director no encontrado'
            });
        }

        if (names) director.names = names.trim();
        if (status !== undefined) director.status = status;

        await director.save();

        res.json({
            status: 200,
            message: 'Director actualizado exitosamente',
            data: director
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'Error al actualizar director',
            error: error.message
        });
    }
};


const deleteDirector = async (req, res) => {
    try {
        const { id } = req.params;

        const director = await Director.findById(id);
        if (!director) {
            return res.status(404).json({
                status: 404,
                message: 'Director no encontrado'
            });
        }

        director.status = false;
        await director.save();

        res.json({
            status: 200,
            message: 'Director desactivado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al desactivar director',
            error: error.message
        });
    }
};

module.exports = {
    getDirectors,
    getActiveDirectors,
    createDirector,
    updateDirector,
    deleteDirector
};