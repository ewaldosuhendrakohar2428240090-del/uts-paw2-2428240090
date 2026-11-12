const express = require('express');
const router = express.Router();
const pengelolaController = require('../controllers/pengelolaController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', pengelolaController.getAll);
// router.get('/:id', pengelolaController.getById);
router.post('/', cekApiKey, pengelolaController.create);

module.exports = router;