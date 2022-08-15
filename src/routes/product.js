const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProduct);
router.post('/', productController.insertProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router


