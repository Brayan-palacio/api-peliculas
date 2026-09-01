const Producer = require('../models/Producer');


const getProducers = async (req, res) => {
    try {
        const producers = await Producer.find();
        res.json({
            status: 200,
            count: producers.length,
            data: producers
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener productoras',
            error: error.message
        });
    }
};


const getActiveProducers = async (req, res) => {
    try {
        const producers = await Producer.find({ status: true });
        res.json({
            status: 200,
            count: producers.length,
            data: producers
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener productoras activas',
            error: error.message
        });
    }
};


const createProducer = async (req, res) => {
    try {
        const name = req.body.name || req.body.nombre;
        const slogan = req.body.slogan;
        const description = req.body.description || req.body.descripcion;

        if (!name) {
            return res.status(400).json({
                status: 400,
                message: 'El nombre de la productora es obligatorio'
            });
        }

        const producer = await Producer.create({
            name: name.trim(),
            slogan: slogan ? slogan.trim() : undefined,
            description: description ? description.trim() : undefined
        });

        res.status(201).json({
            status: 201,
            message: 'Productora creada exitosamente',
            data: producer
        });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateName = req.body.name || req.body.nombre;
            return res.status(409).json({
                status: 409,
                message: `La productora "${duplicateName}" ya existe`
            });
        }
        res.status(400).json({
            status: 400,
            message: 'Error al crear productora',
            error: error.message
        });
    }
};


const updateProducer = async (req, res) => {
    try {
        const { id } = req.params;
        const name = req.body.name || req.body.nombre;
        const slogan = req.body.slogan;
        const description = req.body.description || req.body.descripcion;
        const { status } = req.body;

        const producer = await Producer.findById(id);
        if (!producer) {
            return res.status(404).json({
                status: 404,
                message: 'Productora no encontrada'
            });
        }

        if (name) producer.name = name.trim();
        if (status !== undefined) producer.status = status;
        if (slogan !== undefined) producer.slogan = slogan.trim();
        if (description !== undefined) producer.description = description.trim();

        await producer.save();

        res.json({
            status: 200,
            message: 'Productora actualizada exitosamente',
            data: producer
        });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateName = req.body.name || req.body.nombre;
            return res.status(409).json({
                status: 409,
                message: `La productora "${duplicateName}" ya existe`
            });
        }
        res.status(400).json({
            status: 400,
            message: 'Error al actualizar productora',
            error: error.message
        });
    }
};


const deleteProducer = async (req, res) => {
    try {
        const { id } = req.params;

        const producer = await Producer.findById(id);
        if (!producer) {
            return res.status(404).json({
                status: 404,
                message: 'Productora no encontrada'
            });
        }

        producer.status = false;
        await producer.save();

        res.json({
            status: 200,
            message: 'Productora desactivada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al desactivar productora',
            error: error.message
        });
    }
};

module.exports = {
    getProducers,
    getActiveProducers,
    createProducer,
    updateProducer,
    deleteProducer
};