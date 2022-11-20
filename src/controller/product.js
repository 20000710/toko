const {
    getAllProducts,
    countProduct,
    getDetailProduct,
    insertProduct,
    updateProduct,
    deleteProduct
} = require('../models/product')
const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helper/common');
const { log } = require('console');
const cloudinary = require('../middlewares/cloudinary');

const productController = {
    getAllProduct: async (req, res) => {
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'name';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const allData = await countProduct()
                console.log("allData: ", allData)
                const totalData = allData.rows[0].count;
                const result = await getAllProducts(
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
                            message: 'Success get all products',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `product with keyword ${search} not found`,
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
                        message: `Success get all products`,
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
            console.log('error: ', error);
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    getDetailProduct: async (req, res) => {
        const { id } = req.params
        try {
            const result = await getDetailProduct(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get product by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `product with id ${id} not found`,
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
    insertProduct: async (req, res) => {
        try {
            
            log('file: ', req.file)
            const result = await cloudinary.uploader.upload(req.file.path)
            const photo = result.secure_url;
            const cloudinary_id = result.public_id
            const { name, brand, category_id, size, color, price, quantity, seller_id, description } = req.body;
            const id = uuidv4();
            const data = {
                id,
                name,
                brand,
                category_id,
                size,
                color,
                price,
                quantity,
                seller_id,
                photo,
                description,
                cloudinary_id
            }
            console.log('photo: ', photo);
            console.log('data: ', data)
            await insertProduct(data)
            success(res, {
                code: 200,
                status: 'success',
                message: 'new product has been created',
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
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params
            const { name, brand, category_id, size, color, price, quantity, seller_id, description } = req.body;
            const productCheck = await getDetailProduct(id);

            if (productCheck.rowCount > 0) {
                console.log('req-file: ', req.file);
                const result = await cloudinary.uploader.upload(req.file.path)
                const photo = result.secure_url;
                const cloudinary_id = result.public_id
                
                const data = {
                    id,
                    name,
                    brand,
                    category_id,
                    size,
                    color,
                    price,
                    quantity,
                    seller_id,
                    photo,
                    description,
                    cloudinary_id
                }
                await updateProduct(data)
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update product',
                    data: productCheck.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `product with id ${id} not found`,
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
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const checkProduct = await getDetailProduct(id);
            if (checkProduct.rowCount > 0) {
                await deleteProduct(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted product with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `product with id ${id} is not found`,
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

module.exports = productController