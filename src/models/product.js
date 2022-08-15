const Pool = require('../config/db')

const getAllProducts = ({limit, offset, sort, sortby}) => {
    return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const searchingProducts = ({input}) => {
    return Pool.query(`SELECT * FROM product WHERE brand LIKE '${input}%' OR name LIKE '${input}%'`)
}

const getProduct = (id) => {
    return Pool.query(`SELECT * FROM product WHERE id_product=${id}`);
}

const insertProduct = (name, brand, category_id, size, color, price, seller_id) => Pool.query(`
        INSERT INTO product(name, brand, category_id, size, color, price, seller_id)
        VALUES ('${name}', '${brand}', ${category_id}, '${size}', '${color}', ${price}, ${seller_id})
    `)

const updateProduct = (id, name, brand, category_id, size, color, price, seller_id) => Pool.query(`
        UPDATE product SET name='${name}', brand='${brand}', category_id=${category_id},
        size='${size}', color='${color}', price=${price}, seller_id=${seller_id}
        WHERE id_product=${id}
    `)

const deleteProduct = (id) => {
    return Pool.query(`DELETE FROM product WHERE id_product=${id}`);
}

const countProduct = () => {
    return Pool.query(`SELECT COUNT(*) FROM product`);
}

module.exports = {
    getAllProducts,
    searchingProducts,
    getProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countProduct,
}