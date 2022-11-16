const Pool = require('../config/db')

const getAllSellers = (
    searchQuery,
    offsetValue,
    limitValue,
    sortQuery,
    modeQuery) => {
    return new Promise((resolve, reject) => {
        Pool.query(`
        SELECT * FROM seller WHERE LOWER(name) LIKE '%${searchQuery}%'
        ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        )
    })
}

const getDetailSeller = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM seller WHERE id_seller='${id}'`,
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

const updateSeller = (data) => {
    return new Promise((resolve, reject) => {
        const {
            id, 
            name, 
            phone, 
            store_name, 
            address
        } = data
        Pool.query(
            `UPDATE seller SET name='${name}', phone='${phone}', 
        store_name='${store_name}', address='${address}' 
        WHERE id_seller='${id}'
        `,
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

const deleteSeller = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM seller WHERE id_seller='${id}'`,
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

const countSeller = () => {
    return Pool.query(`SELECT COUNT(*) FROM seller`);
}


module.exports = {
    getAllSellers,
    getDetailSeller,
    updateSeller,
    deleteSeller,
    countSeller,
}