const express = require('express');
const router = express.Router();
const {getAllSellers, updateSeller, deleteSeller, getDetailSeller} = require('../controller/seller');
const {protect} = require('../middlewares/auth')

router.get('/', protect, getAllSellers);
router.get('/:id', protect, getDetailSeller);
router.put('/:id', protect, updateSeller);
router.delete('/:id', protect, deleteSeller);

module.exports = router


