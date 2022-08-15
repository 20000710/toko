const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');

router.get('/', categoryController.getAllCatogories);
router.get('/:id', categoryController.getCategory);
router.post('/', categoryController.insertCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router


