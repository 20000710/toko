const {getAllProducts, countProduct, searchingProducts, getProduct, insertProduct, updateProduct, deleteProduct, findId} = require('../models/product')
const commonHelper = require('../helper/common')
const createError = require('http-errors')
const client = require('../config/redis')

const productController = {
    getAllProduct: async(req, res) => {
        try {
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 5
                const offset = (page - 1) * limit
                const sortby = req.query.sortby || "name"
                const sort = req.query.sort?.toUpperCase() || "ASC"
                const result = await getAllProducts({limit, offset, sort, sortby})
                const {rows: [count]} = await countProduct()
                const totalData = parseInt(count.count)
                const totalPage =  Math.ceil(totalData / limit)
                const pagination = {
                    currentPage: page,
                    limit: limit,
                    totalData: totalData,
                    totalPage: totalPage
                }
                commonHelper.response(res, result.rows, 200, "get data success", pagination)
                if(req.query.search !== undefined){
                    const input = req.query.search
                    const result = await searchingProducts({input})
                    commonHelper.response(res, result.rows, 200, "get data success")
                }
        } catch (error) {
            console.log(error);
        }
    },
    getProduct: (req, res) => {
        const id = Number(req.params.id)
        getProduct(id)
        .then(result => {
            client.setEx(`product/${id}`,60*60,JSON.stringify(result.rows))
            commonHelper.response(res, result.rows, 200, "get data success")
        })
        .catch(err => res.send(err))
    },
    insertProduct: async(req, res) => {
        console.log('req: ', req.file.filename)
        const PORT = process.env.PORT
        const DB_HOST = process.env.DB_HOST
        const photo = req.file.filename;
        const { name, brand, category_id, size, color, price, seller_id, description } = req.body;
        const {rows: [count]} = await countProduct()

        const id = Number(count.count)+1;
        const data = {
            id,
            name,
            brand,
            category_id,
            size,
            color,
            price,
            seller_id,
            photo: `http://${DB_HOST}:${PORT}/img/${photo}`,
            description
        }
        insertProduct(data)
        .then(result => commonHelper.response(res, result.rows, 201, "Product Created"))
        .catch(err => res.send(err))
    },
    updateProduct: async (req, res, next) => {
        try {
            const PORT = process.env.PORT
            const DB_HOST = process.env.DB_HOST
            const photo = req.file.filename;
            const id = Number(req.params.id)
            const { name, brand, category_id, size, color, price, seller_id, description } = req.body;
            const {rowCount} = await findId(id)
            
            if(!rowCount){
                return next(createError(403, "ID is not found"))
            }
            const data = {
                id,
                name,
                brand,
                category_id,
                size,
                color,
                price,
                seller_id,
                photo: `http://${DB_HOST}:${PORT}/img/${photo}`,
                description
            }
            updateProduct(data)
            .then(result => commonHelper.response(res, result.rows, 200, "Product Updated"))
            .catch(err => res.send(err))
        } catch(err){
            console.log(err)
        }
    },
    deleteProduct: async (req, res, next) => {
        try{
            const id = Number(req.params.id)
            const {rowCount} = await findId(id)

            if(!rowCount){
                return next(createError(403,"ID is Not Found"))
            }
            
            deleteProduct(id)
            .then(result => commonHelper.response(res, result.rows, 200, "Product Deleted"))
            .catch(err => res.send(err))
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = productController