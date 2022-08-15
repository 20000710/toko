const categoryModel = require('../models/category')
const commonHelper = require('../helper/common')

const categoryController = {
    getAllCatogories: async(req, res) => {
        try {
            if(req.query.sortby !== undefined && req.query.sort !== undefined){
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 5
                const offset = (page - 1) * limit
                const sortby = req.query.sortby || name
                const sort = req.query.sort.toUpperCase() || "ASC"
                const result = await categoryModel.getAllCategories({limit, offset, sort, sortby})
                const {rows: [count]} = await categoryModel.countCategory()
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
                const result = await categoryModel.searchingCategories({input})
                commonHelper.response(res, result.rows, 200, "get data success")
            } else{
                res.json("Must be input sortby=? & sort=asc|desc & page=? & limit=? ")
            }
        } catch (error) {
            console.log(error);
        }
    },
    getCategory: (req, res) => {
        const id = Number(req.params.id)
        categoryModel.getCategory(id)
        .then(result => commonHelper.response(res, result.rows, 200, "get data success"))
        .catch(err => res.send(err))
    },
    insertCategory: (req, res) => {
        const { name } = req.body;
        categoryModel.insertCategory(name)
        .then(result => commonHelper.response(res, result.rows, 201, "Category Created"))
        .catch(err => res.send(err))
    },
    updateCategory: (req, res) => {
        const id = Number(req.params.id)
        const name = req.body.name
        categoryModel.updateCategory(id, name)
        .then(result => commonHelper.response(res, result.rows, 200, "Category Updated"))
        .catch(err => res.send(err))
    },
    deleteCategory: (req, res) => {
        const id = Number(req.params.id)
        categoryModel.deleteCategory(id)
        .then(result => commonHelper.response(res, result.rows, 200, "Category deleted"))
        .catch(err => res.send(err))
    }
}

module.exports = categoryController