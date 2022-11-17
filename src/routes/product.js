const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {getAllProduct, getDetailProduct, insertProduct, updateProduct, deleteProduct} = require('../controller/product');
const {protect} = require('../middlewares/auth')

router.get('/', getAllProduct);
router.get('/:id', protect, getDetailProduct);
router.post('/', protect, upload, insertProduct);
router.put('/:id', protect, upload, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router


