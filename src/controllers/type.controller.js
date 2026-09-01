const Type = require('../models/Type');


const getTypes = async (req, res) => {
    try {
        const types = await Type.find();
        res.json({
            status: 200,
            count: types.length,
            data: types
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener tipos',
            error: error.message
        });
    }
};


const createType = async (req, res) => {
    try {
        const name = req.body.name || req.body.nombre;
        const description = req.body.description || req.body.descripcion;

        if (!name) {
            return res.status(400).json({
                status: 400,
                message: 'El nombre del tipo es obligatorio'
            });
        }

        const type = await Type.create({
            name: name.trim(),
            description: description ? description.trim() : undefined
        });

        res.status(201).json({
            status: 201,
            message: 'Tipo creado exitosamente',
            data: type
        });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateName = req.body.name || req.body.nombre;
            return res.status(409).json({
                status: 409,
                message: `El tipo "${duplicateName}" ya existe`
            });
        }
        res.status(400).json({
            status: 400,
            message: 'Error al crear tipo',
            error: error.message
        });
    }
};


const updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const name = req.body.name || req.body.nombre;
        const description = req.body.description || req.body.descripcion;

        const type = await Type.findById(id);
        if (!type) {
            return res.status(404).json({
                status: 404,
                message: 'Tipo no encontrado'
            });
        }

        if (name) type.name = name.trim();
        if (description !== undefined) type.description = description.trim();

        await type.save();

        res.json({
            status: 200,
            message: 'Tipo actualizado exitosamente',
            data: type
        });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateName = req.body.name || req.body.nombre;
            return res.status(409).json({
                status: 409,
                message: `El tipo "${duplicateName}" ya existe`
            });
        }
        res.status(400).json({
            status: 400,
            message: 'Error al actualizar tipo',
            error: error.message
        });
    }
};


const deleteType = async (req, res) => {
    try {
        const { id } = req.params;

        const type = await Type.findByIdAndDelete(id);
        if (!type) {
            return res.status(404).json({
                status: 404,
                message: 'Tipo no encontrado'
            });
        }

        res.json({
            status: 200,
            message: 'Tipo eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al eliminar tipo',
            error: error.message
        });
    }
};

module.exports = {
    getTypes,
    createType,
    updateType,
    deleteType
};