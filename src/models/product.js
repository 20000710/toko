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

const insertProduct = (data) => {
        const {id ,name, brand, category_id, size, color, price, seller_id, photo, description} = data
        Pool.query(`
        INSERT INTO product(id_product, name, brand, category_id, size, color, price, seller_id, photo, description)
        VALUES (${id}, '${name}', '${brand}', '${category_id}', '${size}', '${color}', ${price}, '${seller_id}', '${photo}', '${description}')`)
    }

const updateProduct = (id, name, brand, category_id, size, color, price, seller_id, photo, description) => Pool.query(`
        UPDATE product SET name='${name}', brand='${brand}', category_id=${category_id}, size='${size}',
        color='${color}', price=${price}, seller_id=${seller_id}, photo='${photo}', description='${description}'
        WHERE id_product=${id}`)

const deleteProduct = (id) => {
    return Pool.query(`DELETE FROM product WHERE id_product=${id}`);
}

const countProduct = () => {
    return Pool.query(`SELECT COUNT(*) FROM product`);
}

const findId =(id)=>{
    return  new Promise ((resolve,reject) => 
        Pool.query(`SELECT id FROM product WHERE id=${id}`,(error,result)=>{
        if(!error){
            resolve(result)
        } else{
            reject(error)
        }
        })
    )
}

module.exports = {
    getAllProducts,
    searchingProducts,
    getProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countProduct,
    findId,
}