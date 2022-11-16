const transactionsModel = require('../models/transactions')
const { success, failed } = require('../helper/common');
const { v4: uuidv4 } = require('uuid');

const sellerController = {
    getAlltransactions: async (req, res) => {
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'id_transactions';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const allData = await transactionsModel.countTransactions()
                console.log("allData: ", allData)
                const totalData = allData.rows[0].count;
                const result = await transactionsModel.getAllTransactions(
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
                            message: 'Success get all transactions',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `transaction with keyword ${search} not found`,
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
                        message: `Success get all transactions`,
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
            console.log(error);
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    getDetailTransactions: async (req, res) => {
        const { id }= req.params
        try {
            const result = await transactionsModel.getDetailTransactions(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get transaction by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `transaction with id ${id} not found`,
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
    insertTransactions: async (req, res) => {
        try {
            const {
                product_id,
                quantity,
                total_amount,
                payment_type,
                payment_status,
                shipped_date,
                transaction_status,
                customer_id,
                seller_id
            } = req.body;
            const id = uuidv4();
            const data = {
                id,
                product_id,
                quantity,
                total_amount,
                payment_type,
                payment_status,
                shipped_date,
                transaction_status,
                customer_id,
                seller_id
            }
            console.log('data: ', data)
            await transactionsModel.insertTransactions(data)
            success(res, {
                code: 200,
                status: 'success',
                message: 'new transaction has been created',
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
    updateTransactions: async (req, res) => {
        try {
            const { id } = req.params
            const {
                product_id,
                quantity,
                total_amount,
                payment_type,
                payment_status,
                shipped_date,
                transaction_status,
                customer_id,
                seller_id
            } = req.body;
            const transactionCheck = await transactionsModel.getDetailTransactions(id);

            if (transactionCheck.rowCount > 0) {
                const data = {
                    id,
                    product_id,
                    quantity,
                    total_amount,
                    payment_type,
                    payment_status,
                    shipped_date,
                    transaction_status,
                    customer_id,
                    seller_id
                }
                await transactionsModel.updateTransactions(data)
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update transaction',
                    data: transactionCheck.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `transaction with id ${id} not found`,
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
    deleteTransactions: async(req, res) => {
        try {
            const { id } = req.params;
            const checkTransaction = await transactionsModel.getDetailTransactions(id);
            if (checkTransaction.rowCount > 0) {
                await transactionsModel.deleteTransactions(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted transaction with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `transaction with id ${id} is not found`,
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

module.exports = sellerController