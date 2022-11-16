const Pool = require('../config/db')

const getAllAddress = (
    searchQuery,
    offsetValue,
    limitValue,
    sortQuery,
    modeQuery) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM address WHERE LOWER(id_address) LIKE '%${searchQuery}%'
    ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    })
}


const getDetailAddress = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM address WHERE id_address='${id}'`,
        (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        });
    })
}

const insertAddress = (data) => {
    return new Promise((resolve, reject) => {
        const {
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
        } = data
        Pool.query(`
            INSERT INTO address(id_address, address, address2, address_label, address_label2, 
                name_address, name_address2, phone_address, phone_address2, postal_code, postal_code2,
                city, city2
            ) 
            VALUES(
                '${id}',
                '${address}',
                '${address2}',
                '${address_label}',
                '${address_label2}',
                '${name_address}',
                '${name_address2}',
                '${phone_address}',
                '${phone_address2}',
                '${postal_code}',
                '${postal_code2}',
                '${city}',
                '${city2}'
            )`,
        (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })
}

const updateAddress = (data) => {
    return new Promise((resolve, reject) => {
        const {
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
        } = data
        Pool.query(`UPDATE address SET address='${address}', address2='${address2}', 
        address_label='${address_label}', address_label2='${address_label2}',
        name_address='${name_address}', name_address2='${name_address2}', 
        phone_address='${phone_address}', phone_address2='${phone_address2}', 
        postal_code='${postal_code}', postal_code2='${postal_code2}',
        city='${city}', city2='${city2}' 
        WHERE id_address='${id}'`,
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

const deleteAddress = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM address WHERE id_address='${id}'`,
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

const countAddress = () => {
    return Pool.query(`SELECT COUNT(*) FROM address`);
}


module.exports = {
    getAllAddress,
    getDetailAddress,
    insertAddress,
    updateAddress,
    deleteAddress,
    countAddress,
}