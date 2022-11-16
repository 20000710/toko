const express = require('express');
const router = express.Router();
const addressController = require('../controller/address');
const { protect } = require('../middlewares/auth');


router.get('/', protect, addressController.getAllAddress);
router.get('/:id', protect, addressController.getDetailAddress);
router.post('/', protect, addressController.insertAddress);
router.put('/:id', protect, addressController.updateAddress);
router.delete('/:id', protect, addressController.deleteAddress);

module.exports = router


