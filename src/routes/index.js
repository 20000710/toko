const express = require('express')
const router = express.Router()
const categoryRouter = require('./category');
const productRouter = require('./product');
const customerRouter = require('./customer');
const sellerRouter = require('./seller');
const transactionRouter = require('./transactions');
const authCustomerRouter = require('./auth-customer');
const authSellerRouter = require('./auth-seller');
const addressRouter = require('./address');

router
.use('/product', productRouter)
.use('/category', categoryRouter)
.use('/customer', customerRouter)
.use('/seller', sellerRouter)
.use('/transactions', transactionRouter)
.use('/auth/customer', authCustomerRouter)
.use('/auth/seller', authSellerRouter)
.use('/address', addressRouter)

module.exports = router