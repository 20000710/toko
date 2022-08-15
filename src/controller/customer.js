const customerModel = require('../models/customer')
const commonHelper = require('../helper/common')

const customerController = {
    getAllCustomers: async(req, res) => {
        try {
            if(req.query.sortby !== undefined && req.query.sort !== undefined){
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 5
                const offset = (page - 1) * limit
                const sortby = req.query.sortby || name
                const sort = req.query.sort.toUpperCase() || "ASC"
                const result = await customerModel.getAllCustomers({limit, offset, sort, sortby})
                const {rows: [count]} = await customerModel.countCustomer()
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
    getCustomer: (req, res) => {
        const id = Number(req.params.id)
        customerModel.getCustomer(id)
        .then(result => commonHelper.response(res, result.rows, 200, "get data success"))
        .catch(err => res.send(err))
    },
    insertCustomer: (req, res) => {
        const { username, password, name, email, phone, gender, date_of_birth, city, address, postal_code } = req.body;
        customerModel.insertCustomer(username, password, name, email, phone, gender, date_of_birth, city, address, postal_code)
        .then(result => commonHelper.response(res, result.rows, 201, "Customer Created"))
        .catch(err => res.send(err))
    },
    updateCustomer: (req, res) => {
        const id = Number(req.params.id)
        const { username, password, name, email, phone, gender, date_of_birth, city, address, postal_code } = req.body;
        customerModel.updateCustomer(id, username, password, name, email, phone, gender, date_of_birth, city, address, postal_code)
        .then(result => commonHelper.response(res, result.rows, 200, "Customer Updated"))
        .catch(err => res.send(err))
    },
    deleteCustomer: (req, res) => {
        const id = Number(req.params.id)
        customerModel.deleteCustomer(id)
        .then(result => commonHelper.response(res, result.rows, 200, "Customer deleted"))
        .catch(err => res.send(err))
    }
}

module.exports = customerController