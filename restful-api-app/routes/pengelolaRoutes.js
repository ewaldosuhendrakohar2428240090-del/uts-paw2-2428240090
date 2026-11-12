const express = require('express');
const router = express.Router();
const pengelolaController = require('../controllers/pengelolaController');

router.get('/', pengelolaController.getAll);
router.post('/', pengelolaController.create);

module.exports = router;
