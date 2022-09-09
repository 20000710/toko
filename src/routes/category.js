const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const { seller } = require('../middlewares/auth');


router.get('/', seller, categoryController.getAllCatogories);
router.get('/:id', seller, categoryController.getCategory);
router.post('/', seller, categoryController.insertCategory);
router.put('/:id', seller, categoryController.updateCategory);
router.delete('/:id', seller, categoryController.deleteCategory);

module.exports = router


