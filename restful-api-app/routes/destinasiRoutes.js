const express = require('express');
const router = express.Router();
const destinasiController = require('../controllers/destinasiController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', destinasiController.getAll);
// router.get('/:id', destinasiController.getById);
router.post('/', cekApiKey, destinasiController.create);

module.exports = router;