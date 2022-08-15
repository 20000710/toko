const sellerModel = require('../models/seller')
const commonHelper = require('../helper/common')

const sellerController = {
    getAllCSellers: async(req, res) => {
        try {
            if(req.query.sortby !== undefined && req.query.sort !== undefined){
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 5
                const offset = (page - 1) * limit
                const sortby = req.query.sortby || name
                const sort = req.query.sort.toUpperCase() || "ASC"
                const result = await sellerModel.getAllSellers({limit, offset, sort, sortby})
                const {rows: [count]} = await sellerModel.countSeller()
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
    getSeller: (req, res) => {
        const id = Number(req.params.id)
        sellerModel.getSeller(id)
        .then(result => commonHelper.response(res, result.rows, 200, "get data success"))
        .catch(err => res.send(err))
    },
    insertSeller: (req, res) => {
        const { username, password, name, email, phone, address } = req.body;
        sellerModel.insertSeller(username, password, name, email, phone, address)
        .then(result => commonHelper.response(res, result.rows, 201, "Seller Created"))
        .catch(err => res.send(err))
    },
    updateSeller: (req, res) => {
        const id = Number(req.params.id)
        const { username, password, name, email, phone, address } = req.body;
        sellerModel.updateSeller(id, username, password, name, email, phone, address)
        .then(result => commonHelper.response(res, result.rows, 200, "Seller Updated"))
        .catch(err => res.send(err))
    },
    deleteSeller: (req, res) => {
        const id = Number(req.params.id)
        sellerModel.deleteSeller(id)
        .then(result => commonHelper.response(res, result.rows, 200, "Seller deleted"))
        .catch(err => res.send(err))
    }
}

module.exports = sellerController