const express = require('express')
const router = express.Router()
const categoryRouter = require('../routes/category');
const productRouter = require('../routes/product');
const customerRouter = require('../routes/customer');
const sellerRouter = require('../routes/seller');
const transactionRouter = require('../routes/transactions');
const userController = require('../routes/user');

router
.use('/product', productRouter)
.use('/category', categoryRouter)
.use('/customer', customerRouter)
.use('/seller', sellerRouter)
.use('/transactions', transactionRouter)
.use('/user', userController)

module.exports = router