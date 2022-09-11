const {getAllSellers, countSeller, findEmail, createSeller, updateSeller, deleteSeller} = require('../models/seller')
const commonHelper = require('../helper/common')
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const authHelper = require('../helper/auth');

const sellerController = {
    getAllCSellers: async(req, res) => {
        try {
            if(req.query.sortby !== undefined && req.query.sort !== undefined){
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 5
                const offset = (page - 1) * limit
                const sortby = req.query.sortby || name
                const sort = req.query.sort.toUpperCase() || "ASC"
                const result = await getAllSellers({limit, offset, sort, sortby})
                const {rows: [count]} = await countSeller()
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
    login: async(req,res) => {
        console.log('res: ', res)
        try {
            const {email, password} = req.body;
            const {rows: [user]} = await findEmail(email)
            if(!user){
                return commonHelper.response(res, null, 403, "Email is invalid")
            }
            const isValidPassword = bcrypt.compareSync(password, user.password)

            if(!isValidPassword){
                return commonHelper.response(res, null, 403, "Password is invalid")
            }
            delete user.password
            const payload = {
                email: user.email,
                role: user.role
            }
            user.token = authHelper.generateToken(payload)
            user.refreshToken = authHelper.generateRefershToken(payload)

            commonHelper.response(res, user, 201, 'login is successful')
        } catch (error) {
            console.log(error)            
        }
    },
    profile: async(req, res) => {
        console.log('request: ', req.payload)
        const email = req.payload.email
        const {rows: [user]} = await findEmail(email)
        delete user.password
        commonHelper.response(res, user, 200, 'success get profile')
    },
    registerSeller: async(req, res, next) => {
        try{
            const { name, email, phone, store_name, password, role } = req.body;
            const passwordHash = bcrypt.hashSync(password);
            const {rowCount} = await findEmail(email)
            if(rowCount){
                return next(createError(403, "Email is already used"))
            }
            const data = {
                id: uuidv4(),
                name,
                email,
                phone,
                store_name,
                passwordHash,
                role,
            }
            // console.log('data: ', data)
            console.log('res: ', res)
            createSeller(data)
            .then(result => commonHelper.response(res, result.rows, 201, "Seller Created"))
            .catch(err => res.send(err))
        } catch (error){
            console.log(error)
        }
    },
    updateSeller: (req, res) => {
        const id = Number(req.params.id)
        const { username, password, name, email, phone, address } = req.body;
        updateSeller(id, username, password, name, email, phone, address)
        .then(result => commonHelper.response(res, result.rows, 200, "Seller Updated"))
        .catch(err => res.send(err))
    },
    deleteSeller: (req, res) => {
        const id = Number(req.params.id)
        deleteSeller(id)
        .then(result => commonHelper.response(res, result.rows, 200, "Seller deleted"))
        .catch(err => res.send(err))
    }
}

module.exports = sellerController