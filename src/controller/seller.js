const { getAllSellers, countSeller, updateSeller, deleteSeller, getDetailSeller } = require('../models/seller')
const { success, failed } = require('../helper/common');

const sellerController = {
    getAllSellers: async (req, res) => {
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'name';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const allData = await countSeller()
                console.log("allData: ", allData)
                const totalData = allData.rows[0].count;
                const result = await getAllSellers(
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
                            message: 'Success get all seller',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `seller with keyword ${search} not found`,
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
                        message: `Success get all sellers`,
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
    getDetailSeller: async (req, res) => {
        const { id } = req.params
        try {
            const result = await getDetailSeller(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get seller by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `seller with id ${id} not found`,
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
    updateSeller: async (req, res) => {
        const id = req.params.id
        const { name, phone, store_name, address } = req.body;
        const productCheck = await getDetailSeller(id);

        if (productCheck.rowCount > 0) {
            const data = {
                id,
                name,
                phone,
                store_name,
                address
            }
            await updateSeller(data)
            success(res, {
                code: 200,
                status: 'success',
                message: 'Success update seller',
                data: productCheck.rows[0],
            });
        } else {
            failed(res, {
                code: 404,
                status: 'error',
                message: `seller with id ${id} not found`,
                error: [],
            });
        }
    },
    deleteSeller: async (req, res) => {
        try {
            const { id } = req.params;
            const checkSeller = await getDetailSeller(id);
            if (checkSeller.rowCount > 0) {
                await deleteSeller(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted seller with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `seller with id ${id} is not found`,
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