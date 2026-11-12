const express = require('express');
const router = express.Router();
const destinasiController = require('../controllers/destinasiController');

router.get('/', destinasiController.getAll);
router.get('/:id', destinasiController.getById);
router.post('/', destinasiController.create);

module.exports = router;
