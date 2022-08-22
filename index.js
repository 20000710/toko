require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const xss = require('xss-clean');
const mainRouter = require('./src/routes/index')


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(xss())

app.use('/api/v1', mainRouter)
app.use('/img', express.static('./upload'))

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