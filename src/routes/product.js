const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {getAllProduct, getDetailProduct, insertProduct, updateProduct, deleteProduct} = require('../controller/product');
const {protect} = require('../middlewares/auth')

router.get('/', getAllProduct);
router.get('/:id', protect, getDetailProduct);
router.post('/', protect, upload.single("photo"), insertProduct);
router.put('/:id', protect, upload.single("photo"), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router


