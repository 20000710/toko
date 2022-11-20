const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');


router.get('/', protect, categoryController.getAllCatogories);
router.get('/:id', protect, categoryController.getDetailCategory);
router.post('/', protect, upload, categoryController.insertCategory);
router.put('/:id', protect, upload, categoryController.updateCategory);
router.delete('/:id', protect, categoryController.deleteCategory);

module.exports = router


