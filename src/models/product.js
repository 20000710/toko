const Pool = require('../config/db')

const getAllProducts = (
    searchQuery,
    offsetValue,
    limitValue,
    sortQuery,
    modeQuery) => {
    return new Promise((resolve, reject) => {
        Pool.query(`
        SELECT * FROM product WHERE 
        (LOWER(name) LIKE '%${searchQuery}%') OR 
        (LOWER(size) LIKE '${searchQuery}%') OR
        (LOWER(brand) LIKE '%${searchQuery}%')
        ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
            (err, res) => {
                if (err) {
                    console.log('err: ', err);
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        )
    })
}

const getDetailProduct = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM product WHERE id_product='${id}'`,
            (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            }
        )
    })
}

const insertProduct = (data) => {
    return new Promise((resolve, reject) => {
        const {
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
            cloudinary_id } = data
        Pool.query(`
        INSERT INTO product(id_product, name, brand, category_id, size, 
        color, price, quantity, seller_id, photo, description, cloudinary_id)
        VALUES ('${id}', '${name}', '${brand}', '${category_id}', '${size}',
        '${color}', '${price}', ${quantity}, '${seller_id}', '${photo}', '${description}', 
        '${cloudinary_id}')`,
            (err, res) => {
                console.log('err: ', err);
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            }
        )
    })
}

const updateProduct = (data) => {
    return new Promise((resolve, reject) => {
        const { 
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
            cloudinary_id } = data
        Pool.query(`
        UPDATE product SET name='${name}', brand='${brand}', category_id='${category_id}', size='${size}',
        color='${color}', price=${price}, quantity=${quantity}, seller_id='${seller_id}', photo='${photo}', 
        description='${description}', cloudinary_id='${cloudinary_id}'
        WHERE id_product='${id}'`,
            (err, res) => {
                console.log('err: ', err);
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            }
        )
    })
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM product WHERE id_product='${id}'`,
            (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            }
        )
    })
}

const countProduct = () => {
    return Pool.query(`SELECT COUNT(*) FROM product`);
}

module.exports = {
    getAllProducts,
    getDetailProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countProduct
}