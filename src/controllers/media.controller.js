const Media = require('../models/Media');


const getMedia = async (req, res) => {
    try {
        const { type, genre, year, search } = req.query;
        const filter = {};

        if (type) filter.type = type;
        if (genre) filter.genre = genre;
        if (year) filter.releaseYear = parseInt(year);
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { synopsis: { $regex: search, $options: 'i' } }
            ];
        }

        const media = await Media.find(filter)
            .populate('genre', 'name status')
            .populate('director', 'names name status')
            .populate('producer', 'name status slogan')
            .populate('type', 'name description');

        res.json({
            status: 200,
            count: media.length,
            data: media
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener producciones',
            error: error.message
        });
    }
};


const getMediaById = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await Media.findById(id)
            .populate('genre', 'name status')
            .populate('director', 'names name status')
            .populate('producer', 'name status slogan')
            .populate('type', 'name description');

        if (!media) {
            return res.status(404).json({
                status: 404,
                message: 'Producción no encontrada'
            });
        }

        res.json({
            status: 200,
            data: media
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al obtener la producción',
            error: error.message
        });
    }
};


const createMedia = async (req, res) => {
    try {
        const serial = req.body.serial;
        const title = req.body.title || req.body.titulo;
        const synopsis = req.body.synopsis || req.body.sinopsis;
        const url = req.body.url;
        const coverImage = req.body.coverImage || req.body.imagen;
        const releaseYear = req.body.releaseYear || req.body.anioEstreno || req.body.year;

        const genre = req.body.genre || req.body.genero;
        const director = req.body.director;
        const producer = req.body.producer || req.body.productora;
        const type = req.body.type || req.body.tipo;


        if (!serial || !title || !synopsis || !url || !coverImage || !releaseYear || !genre || !director || !producer || !type) {
            return res.status(400).json({
                status: 400,
                message: 'Todos los campos son obligatorios'
            });
        }


        const existingSerial = await Media.findOne({ serial: serial.toString().trim() });
        if (existingSerial) {
            return res.status(409).json({
                status: 409,
                message: `El serial "${serial}" ya está en uso`
            });
        }


        const existingUrl = await Media.findOne({ url: url.toString().trim() });
        if (existingUrl) {
            return res.status(409).json({
                status: 409,
                message: `La URL "${url}" ya está en uso`
            });
        }

        const media = await Media.create({
            serial: serial.toString().trim(),
            title: title.toString().trim(),
            synopsis: synopsis.toString().trim(),
            url: url.toString().trim(),
            coverImage: coverImage.toString().trim(),
            releaseYear: parseInt(releaseYear),
            genre,
            director,
            producer,
            type
        });


        const populatedMedia = await Media.findById(media._id)
            .populate('genre', 'name status')
            .populate('director', 'names name status')
            .populate('producer', 'name status slogan')
            .populate('type', 'name description');

        res.status(201).json({
            status: 201,
            message: 'Producción creada exitosamente',
            data: populatedMedia
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'Error al crear producción',
            error: error.message
        });
    }
};


const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const serial = req.body.serial;
        const title = req.body.title || req.body.titulo;
        const synopsis = req.body.synopsis || req.body.sinopsis;
        const url = req.body.url;
        const coverImage = req.body.coverImage || req.body.imagen;
        const releaseYear = req.body.releaseYear || req.body.anioEstreno || req.body.year;

        const genre = req.body.genre || req.body.genero;
        const director = req.body.director;
        const producer = req.body.producer || req.body.productora;
        const type = req.body.type || req.body.tipo;

        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({
                status: 404,
                message: 'Producción no encontrada'
            });
        }

        if (serial && serial !== media.serial) {
            const existing = await Media.findOne({ serial: serial.toString().trim() });
            if (existing) {
                return res.status(409).json({
                    status: 409,
                    message: `El serial "${serial}" ya está en uso`
                });
            }
            media.serial = serial.toString().trim();
        }

        if (url && url !== media.url) {
            const existing = await Media.findOne({ url: url.toString().trim() });
            if (existing) {
                return res.status(409).json({
                    status: 409,
                    message: `La URL "${url}" ya está en uso`
                });
            }
            media.url = url.toString().trim();
        }

        if (title) media.title = title.toString().trim();
        if (synopsis) media.synopsis = synopsis.toString().trim();
        if (coverImage) media.coverImage = coverImage.toString().trim();
        if (releaseYear) media.releaseYear = parseInt(releaseYear);
        if (genre) media.genre = genre;
        if (director) media.director = director;
        if (producer) media.producer = producer;
        if (type) media.type = type;

        await media.save();

        const populatedMedia = await Media.findById(media._id)
            .populate('genre', 'name status')
            .populate('director', 'names name status')
            .populate('producer', 'name status slogan')
            .populate('type', 'name description');

        res.json({
            status: 200,
            message: 'Producción actualizada exitosamente',
            data: populatedMedia
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: 'Error al actualizar producción',
            error: error.message
        });
    }
};


const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await Media.findByIdAndDelete(id);
        if (!media) {
            return res.status(404).json({
                status: 404,
                message: 'Producción no encontrada'
            });
        }

        res.json({
            status: 200,
            message: 'Producción eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error al eliminar producción',
            error: error.message
        });
    }
};

module.exports = {
    getMedia,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
};