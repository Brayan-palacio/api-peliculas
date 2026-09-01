const express = require('express');
const router = express.Router();
const {
    getTypes,
    createType,
    updateType,
    deleteType
} = require('../controllers/type.controller');

router.get('/', getTypes);
router.post('/', createType);
router.put('/:id', updateType);
router.delete('/:id', deleteType);

module.exports = router;