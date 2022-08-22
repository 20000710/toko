const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {getAllProduct, getProduct, insertProduct, updateProduct, deleteProduct} = require('../controller/product');
const {protect} = require('../middlewares/auth')
const {hitCacheProductDetail, clearCacheProductDetail} = require('../middlewares/redis')

router.get('/', protect, getAllProduct);
router.get('/:id', protect, hitCacheProductDetail, getProduct);
router.post('/', protect, upload.single('photo'), insertProduct);
router.put('/:id', protect, clearCacheProductDetail, upload.single('photo'), updateProduct);
router.delete('/:id', protect, clearCacheProductDetail, deleteProduct);

module.exports = router


