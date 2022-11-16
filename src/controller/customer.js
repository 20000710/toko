const customerModel = require('../models/customer')
const { success, failed } = require('../helper/common');
const deleteFile = require('../helper/deleteFile');

const customerController = {
    getAllCustomers: async (req, res) => {
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'name';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const allData = await customerModel.countCustomer()
                console.log("allData: ", allData)
                const totalData = allData.rows[0].count;
                const result = await customerModel.getAllCustomers(
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
                            message: 'Success get all customers',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `customer with keyword ${search} not found`,
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
                        message: `Success get all customer`,
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
    getDetailCustomer: async (req, res) => {
        const { id } = req.params
        try {
            const result = await customerModel.getDetailCustomer(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get customer by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `customer with id ${id} not found`,
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
    updateCustomer: async (req, res) => {
        try {
            const { id } = req.params
            const {
                name,
                email,
                phone,
                gender,
                date_of_birth,
                address_id
            } = req.body;
            const customerCheck = await customerModel.getDetailCustomer(id);

            if (customerCheck.rowCount > 0) {
                const data = {
                    id,
                    name,
                    email,
                    phone,
                    gender,
                    date_of_birth,
                    address_id
                }
                await customerModel.updateCustomer(data)
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update customer',
                    data: customerCheck.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `customer with id ${id} not found`,
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

    updateAddress: async (req, res) => {
        try {
            const { id } = req.params
            const {
                address_label,
                address,
                address2} = req.body;
            const customerCheck = await customerModel.getDetailCustomer(id);

            if (customerCheck.rowCount > 0) {
                const data = {
                    id,
                    address_label,
                    address,
                    address2
                }
                await customerModel.updateAddress(data)
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update customer address',
                    data: customerCheck.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `customer address with id ${id} not found`,
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

    updatePhoto: async (req, res) => {
        try {
            const { id } = req.params;
            let photo;
            if (req.file) {
                const usersCheck = await customerModel.getDetailCustomer(id);
                if (usersCheck.rowCount > 0) {
                    if (usersCheck.rows[0].photo == null) {
                        photo = req.file.filename;
                        const data = {
                            id,
                            photo,
                        };
                        await customerModel.updatePhoto(data);
                        const newData = await customerModel.getDetailCustomer(id);
                        success(res, {
                            code: 200,
                            status: 'success',
                            message: 'Success update worker photo',
                            data: newData.rows[0],
                        });
                    } else {
                        deleteFile(`public/${usersCheck.rows[0].photo}`);
                        photo = req.file.filename;
                        const data = {
                            id,
                            photo,
                        };
                        await customerModel.updatePhoto(data);
                        const newData = await customerModel.getDetailCustomer(id);
                        success(res, {
                            code: 200,
                            status: 'success',
                            message: 'Success update worker photo',
                            data: newData.rows[0],
                        });
                    }
                } else {
                    deleteFile(`public/${req.file.filename}`);
                    failed(res, {
                        code: 404,
                        status: 'error',
                        message: `worker with id ${id} not found`,
                        error: [],
                    });
                    return;
                }
            } else {
                failed(res, {
                    code: 400,
                    status: 'error',
                    message: 'worker photo is required',
                    error: [],
                });
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

    deleteCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            const checkCustomer = await customerModel.getDetailCustomer(id);
            if (checkCustomer.rowCount > 0) {
                await customerModel.deleteCustomer(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted customer with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `customer with id ${id} is not found`,
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

module.exports = customerController