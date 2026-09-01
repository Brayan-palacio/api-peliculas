const express = require('express');
const router = express.Router();
const {
    getProducers,
    getActiveProducers,
    createProducer,
    updateProducer,
    deleteProducer
} = require('../controllers/producer.controller');

router.get('/', getProducers);
router.get('/active', getActiveProducers);
router.post('/', createProducer);
router.put('/:id', updateProducer);
router.delete('/:id', deleteProducer);

module.exports = router;