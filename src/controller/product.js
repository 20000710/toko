const productModel = require('../models/product')
const commonHelper = require('../helper/common')

const productController = {
    getAllProduct: async(req, res) => {
        try {
            if(req.query.sortby !== undefined && req.query.sort !== undefined){
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 5
                const offset = (page - 1) * limit
                const sortby = req.query.sortby || name
                const sort = req.query.sort.toUpperCase() || "ASC"
                const result = await productModel.getAllProducts({limit, offset, sort, sortby})
                const {rows: [count]} = await productModel.countProduct()
                const totalData = parseInt(count.count)
                const totalPage =  Math.ceil(totalData / limit)
                const pagination = {
                    currentPage: page,
                    limit: limit,
                    totalData: totalData,
                    totalPage: totalPage
                }
                commonHelper.response(res, result.rows, 200, "get data success", pagination)
            } else if(req.query.search !== undefined){
                const input = req.query.search
                const result = await productModel.searchingProducts({input})
                commonHelper.response(res, result.rows, 200, "get data success")
            } else{
                res.json("Must be input sortby=? & sort=asc|desc & page=? & limit=? ")
            }
        } catch (error) {
            console.log(error);
        }
    },
    getProduct: (req, res) => {
        const id = Number(req.params.id)
        productModel.getProduct(id)
        .then(result => commonHelper.response(res, result.rows, 200, "get data success"))
        .catch(err => res.send(err))
    },
    insertProduct: (req, res) => {
        const { name, brand, category_id, size, color, price, seller_id } = req.body;
        productModel.insertProduct(name, brand, category_id, size, color, price, seller_id)
        .then(result => commonHelper.response(res, result.rows, 201, "Product Created"))
        .catch(err => res.send(err))
    },
    updateProduct: (req, res) => {
        const id = Number(req.params.id)
        const { name, brand, category_id, size, color, price, seller_id } = req.body;
        productModel.updateProduct(id, name, brand, category_id, size, color, price, seller_id)
        .then(result => commonHelper.response(res, result.rows, 200, "Product Updated"))
        .catch(err => res.send(err))
    },
    deleteProduct: (req, res) => {
        const id = Number(req.params.id)
        productModel.deleteProduct(id)
        .then(result => commonHelper.response(res, result.rows, 200, "Product Deleted"))
        .catch(err => res.send(err))
    }
}

module.exports = productController