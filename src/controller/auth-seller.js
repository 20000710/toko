const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { findby, register } = require('../models/auth-seller');
const { success, successLogin, failed } = require('../helper/common');
const authHelper = require('../helper/auth');

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, phone, store_name, password } = req.body;
            const emailCheck = await findby('email', email)
            if (emailCheck.rowCount == 0) {
                const id = uuidv4();
                const verifyToken = crypto.randomBytes(16).toString('hex');
                const passwordHashed = await bcrypt.hash(password, 10);
                const address = ''
                const data = {
                    id,
                    name,
                    email,
                    passwordHashed,
                    phone,
                    store_name,
                    address,
                    verifyToken
                };
                await register(data);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'register success',
                    data: data
                });
            } else {
                const err = {
                    message: 'email is already registered'
                };
                failed(res, {
                    code: 400,
                    status: 'error',
                    message: err.message,
                    error: [],
                });
                return;
            }
        } catch (error) {
            console.log(error);
            failed(res, {
                code: 500,
                status: 'error',
                message: error,
                error: [],
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const isRegistered = await findby('email', email)

            if (isRegistered.rowCount > 0) {
                bcrypt
                    .compare(password, isRegistered.rows[0].password)
                    .then(async (match) => {
                        if (match) {
                            const token = await authHelper.generateToken({
                                id: isRegistered.rows[0].id_seller,
                            });
                            successLogin(res, {
                                code: 200,
                                status: 'success',
                                message: 'login success',
                                name: isRegistered.rows[0].name,
                                token: token,
                            });
                        } else {
                            failed(res, {
                                code: 500,
                                status: 'error',
                                message: 'wrong email or password',
                                error: [],
                            });
                        }
                    });

            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: 'email not registered',
                    error: [],
                });
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },

    refreshToken: (req, res) => {
        const { refreshToken }= req.body
        const decode = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
        const payload = {
            email: decode.email,
            role: decode.role
        }
        const result = {
            refreshToken: authHelper.generateRefershToken(payload)
        }
        success(res, {
            code: 200,
            status: 'success',
            message: 'success refresh token',
            data: result
        });
    }
}

module.exports = authController