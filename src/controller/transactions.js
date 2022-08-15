const transactionsModel = require('../models/transactions')
const commonHelper = require('../helper/common')

const sellerController = {
    getAlltransactions: async(req, res) => {
        try {
            if(req.query.sortby !== undefined && req.query.sort !== undefined){
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 5
                const offset = (page - 1) * limit
                const sortby = req.query.sortby
                const sort = req.query.sort.toUpperCase() || "ASC"
                const result = await transactionsModel.getAllTransactions({limit, offset, sort, sortby})
                const {rows: [count]} = await transactionsModel.countTransactions()
                const totalData = parseInt(count.count)
                const totalPage =  Math.ceil(totalData / limit)
                const pagination = {
                    currentPage: page,
                    limit: limit,
                    totalData: totalData,
                    totalPage: totalPage
                }
                commonHelper.response(res, result.rows, 200, "get data success", pagination)
            }else{
                res.json("Must be input sortby=? & sort=asc|desc & page=? & limit=? ")
            }
        } catch (error) {
            console.log(error);
        }
    },
    getTransactions: (req, res) => {
        const id = Number(req.params.id)
        transactionsModel.getTransactions(id)
        .then(result => commonHelper.response(res, result.rows, 200, "get data success"))
        .catch(err => res.send(err))
    },
    insertTransactions: (req, res) => {
        const { product_id, quantity, total_amount, payment_type, payment_status, shipped_date, transaction_status, customer_id, seller_id } = req.body;
        transactionsModel.insertTransactions(product_id, quantity, total_amount, payment_type, payment_status, shipped_date, transaction_status, customer_id, seller_id)
        .then(result => commonHelper.response(res, result.rows, 201, "Transactions Created"))
        .catch(err => res.send(err))
    },
    updateTransactions: (req, res) => {
        const id = Number(req.params.id)
        const { product_id, quantity, total_amount, payment_type, payment_status, shipped_date, transaction_status, customer_id, seller_id } = req.body;
        transactionsModel.updateTransactions(id, product_id, quantity, total_amount, payment_type, payment_status, shipped_date, transaction_status, customer_id, seller_id)
        .then(result => commonHelper.response(res, result.rows, 200, "Transactions Updated"))
        .catch(err => res.send(err))
    },
    deleteTransactions: (req, res) => {
        const id = Number(req.params.id)
        transactionsModel.deleteTransactions(id)
        .then(result => commonHelper.response(res, result.rows, 200, "Transactions deleted"))
        .catch(err => res.send(err))
    }
}

module.exports = sellerController