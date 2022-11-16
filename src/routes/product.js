const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {getAllProduct, getDetailProduct, insertProduct, updateProduct, deleteProduct} = require('../controller/product');
const {protect} = require('../middlewares/auth')
const {hitCacheProductDetail, clearCacheProductDetail} = require('../middlewares/redis')

router.get('/', getAllProduct);
router.get('/:id', protect, hitCacheProductDetail, getDetailProduct);
router.post('/', protect, upload, insertProduct);
router.put('/:id', protect, clearCacheProductDetail, upload, updateProduct);
router.delete('/:id', protect, clearCacheProductDetail, deleteProduct);

module.exports = router


