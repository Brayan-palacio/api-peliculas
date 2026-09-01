const express = require('express');
const router = express.Router();
const {
    getGenres,
    getActiveGenres,
    createGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/genre.controller');

router.get('/', getGenres);
router.get('/active', getActiveGenres);
router.post('/', createGenre);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;