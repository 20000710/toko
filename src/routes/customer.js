const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', protect, customerController.getAllCustomers);
router.get('/:id', protect, customerController.getDetailCustomer);
router.put('/:id', protect, customerController.updateCustomer);
router.put('/upload/:id', protect, upload.single("photo") ,customerController.updatePhoto);
router.put('/address/:id', protect, customerController.updateAddress);
router.delete('/:id', protect, customerController.deleteCustomer);

module.exports = router


