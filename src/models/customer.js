const Pool = require('../config/db')

const getAllCustomers = (
    searchQuery,
    offsetValue,
    limitValue,
    sortQuery,
    modeQuery) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM customer WHERE LOWER(name) LIKE '%${searchQuery}%'
    ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    })
}

const getDetailCustomer = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`
        SELECT customer.id_customer, customer.name, customer.email, customer.password,
        customer.phone, customer.gender, customer.date_of_birth, customer.photo, customer.verify_token,
        address.address, address.address2, address.address_label, address.address_label2, 
        address.name_address, address.name_address2, address.phone_address, address.phone_address2,
        address.postal_code, address.postal_code2, address.city, address.city2
        FROM customer 
        LEFT JOIN address ON customer.address_id = address.id_address
        WHERE id_customer='${id}'`,
            (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            });
    })
}

const updateCustomer = (data) => {
    return new Promise((resolve, reject) => {
        const {
            id,
            name,
            email,
            phone,
            gender,
            date_of_birth,
            address_id          
        } = data
        Pool.query(
            `UPDATE customer SET name='${name}', email='${email}', phone='${phone}', gender='${gender}',
            date_of_birth='${date_of_birth}', address_id='${address_id}'
        WHERE id_customer='${id}'`,
            (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            }
        );
    })
}

const updateAddress = (data) => {
    return new Promise((resolve, reject) => {
        const {
            id,
            address_label,
            address,
            address2,          
        } = data
        Pool.query(
            `UPDATE customer SET address_label='${address_label}', address='${address}', 
            address2='${address2}' WHERE id_customer='${id}'`,
            (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            }
        );
    })
}


const updatePhoto = (data) => {
    const { id, photo } = data;
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE customer SET photo='${photo}' WHERE id_customer='${id}'`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            },
        );
    });
}

const deleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM customer WHERE id_customer='${id}'`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    })
}

const countCustomer = () => {
    return Pool.query(`SELECT COUNT(*) FROM customer`);
}


module.exports = {
    getAllCustomers,
    getDetailCustomer,
    updateCustomer,
    updateAddress,
    updatePhoto,
    deleteCustomer,
    countCustomer,
}