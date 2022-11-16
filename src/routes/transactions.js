const express = require('express');
const router = express.Router();
const transactionsController = require('../controller/transactions');
const { protect } = require('../middlewares/auth');

router.get('/', protect, transactionsController.getAlltransactions);
router.get('/:id', protect, transactionsController.getDetailTransactions);
router.post('/', protect, transactionsController.insertTransactions);
router.put('/:id', protect, transactionsController.updateTransactions);
router.delete('/:id', protect, transactionsController.deleteTransactions);

module.exports = router


