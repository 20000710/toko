const express = require('express');
const router = express.Router();
const sellerController = require('../controller/seller');

router.get('/', sellerController.getAllCSellers);
router.get('/:id', sellerController.getSeller);
router.post('/', sellerController.insertSeller);
router.put('/:id', sellerController.updateSeller);
router.delete('/:id', sellerController.deleteSeller);

module.exports = router


