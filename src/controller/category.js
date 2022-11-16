const categoryModel = require('../models/category')
const { success, failed } = require('../helper/common')
const { v4: uuidv4 } = require('uuid');

const categoryController = {
    getAllCatogories: async (req, res) => {
        console.log('req: ', req)
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'name';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const allData = await categoryModel.countCategory()
                console.log("allData: ", allData)
                const totalData = allData.rows[0].count;
                const result = await categoryModel.getAllCategories(
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
                            message: 'Success get all categories',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `categories with keyword ${search} not found`,
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
                        message: `Success get all category`,
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
    getDetailCategory: async (req, res) => {
        const {id} = req.params
        try {
            const result = await categoryModel.getDetailCategory(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get category by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `category with id ${id} not found`,
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
    insertCategory: async (req, res) => {
        try {
            const id = uuidv4();
            const { name } = req.body;
            const photo = req.file.filename
            const data = {
                id,
                name,
                photo
            }
            await categoryModel.insertCategory(data);
            success(res, {
                code: 200,
                status: 'success',
                message: 'new category has been created',
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
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params
            console.log('id: ', id);
            const {name} = req.body
            const categoryCheck = await categoryModel.getDetailCategory(id);

            console.log('categoryCheck: ', categoryCheck);
            if (categoryCheck.rowCount > 0) {
                const data = {
                    id,
                    name
                }
                await categoryModel.updateCategory(data);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update category',
                    data: categoryCheck.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `category with id ${id} not found`,
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
    deleteCategory: async(req, res) => {
        try {
            const { id } = req.params;
            const checkCategory = await categoryModel.getDetailCategory(id);
            if (checkCategory.rowCount > 0) {
                await categoryModel.deleteCategory(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted category with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `category with id ${id} is not found`,
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