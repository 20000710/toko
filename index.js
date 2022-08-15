require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const xss = require('xss-clean');
const categoryRouter = require('./src/routes/category');
const productRouter = require('./src/routes/product');
const customerRouter = require('./src/routes/customer');
const sellerRouter = require('./src/routes/seller');
const transactionRouter = require('./src/routes/transactions');


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(xss())

app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/customer', customerRouter)
app.use('/seller', sellerRouter)
app.use('/transactions', transactionRouter)

app.all('*', (req, res, next) => {
    next(new createError.NotFound())
})

app.use((err, req, res, next)=>{
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500

    res.status(statusCode).json({
        message : messageError
    })
    next()
})

const host = process.env.DB_HOST;
const port = process.env.PORT;
app.listen(3030, () => {
    console.log(`server running on http://${host}:${port}`)
})