const express = require('express');
const router = express.Router();
const transactionsController = require('../controller/transactions');

router.get('/', transactionsController.getAlltransactions);
router.get('/:id', transactionsController.getTransactions);
router.post('/', transactionsController.insertTransactions);
router.put('/:id', transactionsController.updateTransactions);
router.delete('/:id', transactionsController.deleteTransactions);

module.exports = router


