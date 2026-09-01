const Genre = require('../models/Genre');


const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json({
            status: 200,
            count: genres.length,
            data: genres
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener géneros',
            error: error.message
        });
    }
};


const getActiveGenres = async (req, res) => {
    try {
        const genres = await Genre.find({ status: true });
        res.json({
            status: 200,
            count: genres.length,
            data: genres
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener géneros activos',
            error: error.message
        });
    }
};


const createGenre = async (req, res) => {
    try {
        const name = req.body.name || req.body.nombre;
        const description = req.body.description || req.body.descripcion;

        
        if (!name) {
            return res.status(400).json({
                status: 400,
                message: 'El nombre del género es obligatorio'
            });
        }

        const genre = await Genre.create({
            name: name.trim(),
            description: description ? description.trim() : undefined
        });

        res.status(201).json({
            status: 201,
            message: 'Género creado exitosamente',
            data: genre
        });
    } catch (error) {
        
        if (error.code === 11000) {
            const duplicateName = req.body.name || req.body.nombre;
            return res.status(409).json({
                status: 409,
                message: `El género "${duplicateName}" ya existe`
            });
        }
        res.status(400).json({
            status: 400,
            message: 'Error al crear género',
            error: error.message
        });
    }
};


const updateGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const name = req.body.name || req.body.nombre;
        const description = req.body.description || req.body.descripcion;
        const { status } = req.body;

        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({
                status: 404,
                message: 'Género no encontrado'
            });
        }

        if (name) genre.name = name.trim();
        if (status !== undefined) genre.status = status;
        if (description !== undefined) genre.description = description.trim();

        await genre.save();

        res.json({
            status: 200,
            message: 'Género actualizado exitosamente',
            data: genre
        });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateName = req.body.name || req.body.nombre;
            return res.status(409).json({
                status: 409,
                message: `El género "${duplicateName}" ya existe`
            });
        }
        res.status(400).json({
            status: 400,
            message: 'Error al actualizar género',
            error: error.message
        });
    }
};


const deleteGenre = async (req, res) => {
    try {
        const { id } = req.params;

        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({
                status: 404,
                message: 'Género no encontrado'
            });
        }

        genre.status = false;
        await genre.save();

        res.json({
            status: 200,
            message: 'Género desactivado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al desactivar género',
            error: error.message
        });
    }
};

module.exports = {
    getGenres,
    getActiveGenres,
    createGenre,
    updateGenre,
    deleteGenre
};