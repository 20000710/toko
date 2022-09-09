const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {getAllProduct, getProduct, insertProduct, updateProduct, deleteProduct} = require('../controller/product');
// const {protect} = require('../middlewares/auth')
const {hitCacheProductDetail, clearCacheProductDetail} = require('../middlewares/redis')

router.get('/', getAllProduct);
router.get('/:id', hitCacheProductDetail, getProduct);
router.post('/', upload.single('photo'), insertProduct);
router.put('/:id', clearCacheProductDetail, upload.single('photo'), updateProduct);
router.delete('/:id', clearCacheProductDetail, deleteProduct);

module.exports = router


