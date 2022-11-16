const addressModel = require('../models/address')
const { success, failed } = require('../helper/common')
const { v4: uuidv4 } = require('uuid');

const categoryController = {
    getAllAddress: async (req, res) => {
        console.log('req: ', req)
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'id_address';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const allData = await addressModel.countAddress()
                console.log("allData: ", allData)
                const totalData = allData.rows[0].count;
                const result = await addressModel.getAllAddress(
                    searchQuery,
                    offsetValue,
                    limitValue,
                    sortQuery,
                    modeQuery,
                );
                const dataPerPage =
                    limitValue > result.rowCount ? result.rowCount : limitValue;
                if (search) {
                    if (result.rowCount > 0) {
                        const pagination = {
                            currentPage: pageValue,
                            dataPerPage: dataPerPage,
                            totalPage: Math.ceil(result.rowCount / limitValue),
                        };
                        success(res, {
                            code: 200,
                            status: 'success',
                            message: 'Success get all addresses',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `addresses with keyword ${search} not found`,
                            error: [],
                        });
                    }
                } else {
                    const pagination = {
                        currentPage: pageValue,
                        dataPerPage: dataPerPage,
                        totalPage: Math.ceil(totalData / limitValue),
                    };
                    success(res, {
                        code: 200,
                        status: 'success',
                        message: `Success get all address`,
                        data: result.rows,
                        pagination,
                    });
                }
            } else {
                failed(res, {
                    code: 400,
                    status: 'error',
                    message: 'limit and page value must be number',
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
    getDetailAddress: async (req, res) => {
        const { id } = req.params
        try {
            const result = await addressModel.getDetailAddress(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get address by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `address with id ${id} not found`,
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
    insertAddress: async (req, res) => {
        try {
            const id = uuidv4();
            const {
                address,
                address2,
                address_label,
                address_label2,
                name_address,
                name_address2,
                phone_address,
                phone_address2,
                postal_code,
                postal_code2,
                city,
                city2
            } = req.body;

            const data = {
                id,
                address,
                address2,
                address_label,
                address_label2,
                name_address,
                name_address2,
                phone_address,
                phone_address2,
                postal_code,
                postal_code2,
                city,
                city2
            }
            await addressModel.insertAddress(data);
            success(res, {
                code: 200,
                status: 'success',
                message: 'new address has been created',
                data: data,
            });
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
    updateAddress: async (req, res) => {
        try {
            const { id } = req.params
            console.log('id: ', id);
            const { 
                address,
                address2,
                address_label,
                address_label2,
                name_address,
                name_address2,
                phone_address,
                phone_address2,
                postal_code,
                postal_code2,
                city,
                city2
             } = req.body
            const addressCheck = await addressModel.getDetailAddress(id);
            console.log('addressCheck: ', addressCheck);
            if (addressCheck.rowCount > 0) {
                const data = {
                    id,
                    address,
                    address2,
                    address_label,
                    address_label2,
                    name_address,
                    name_address2,
                    phone_address,
                    phone_address2,
                    postal_code,
                    postal_code2,
                    city,
                    city2
                }
                await addressModel.updateAddress(data);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update address',
                    data: addressCheck.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `address with id ${id} not found`,
                    error: [],
                });
                return;
            }
        } catch (error) {
            console.log(error);
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    deleteAddress: async (req, res) => {
        try {
            const { id } = req.params;
            const checkAddress = await addressModel.getDetailAddress(id);
            if (checkAddress.rowCount > 0) {
                await addressModel.deleteAddress(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted address with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `address with id ${id} is not found`,
                    error: [],
                });
                return;
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    }
}

module.exports = categoryController