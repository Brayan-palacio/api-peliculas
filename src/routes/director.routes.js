const express = require('express');
const router = express.Router();
const {
    getDirectors,
    getActiveDirectors,
    createDirector,
    updateDirector,
    deleteDirector
} = require('../controllers/director.controller');

router.get('/', getDirectors);
router.get('/active', getActiveDirectors);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

module.exports = router;