const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {findEmail, create} = require('../models/user');
const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');

const userController = {
    register: async(req,res, next) => {
        try {
            const {email, password, fullname, role} = req.body;
            const {rowCount} = await findEmail(email)
            // const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password);
            if(rowCount){
                return next(createError(403, "Email is already used"))
            }
            const data = {
                id: uuidv4(),
                email,
                passwordHash,
                fullname,
                role
            }
            console.log('data: ', data)
            create(data)
            .then(result => commonHelper.response(res, result.rows, 201, "Category Created"))
            .catch(err => res.send(err))    
        }
        catch(error){
            console.log(error)
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
        const email = req.payload.email
        const {rows: [user]} = await findEmail(email)
        delete user.password
        commonHelper.response(res, user, 200, 'success get profile')
    },
    refreshToken: (req, res) => {
        const refreshToken = req.body.refreshToken
        const decode = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
        const payload = {
            email: decode.email,
            role: decode.role
        }
        const result = {
            token: authHelper.generateToken(payload),
            refreshToken: authHelper.generateRefershToken(payload)
        }
        commonHelper.response(res, result, 200, 'success refresh token')
    }
}

module.exports = userController