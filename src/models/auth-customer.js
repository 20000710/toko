const Pool = require('../config/db')

const findby = (row, keyword) => {
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT * FROM customer WHERE ${row} = '${keyword}'`,
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            },
        );
    });
}

const register = (data) => {
    const {
        id,
        name,
        email,
        passwordHashed,
        phone,
        gender,
        date_of_birth,        
        photo,
        verifyToken,
        address_id,
    } = data
    return new Promise ((resolve, reject) => {
        Pool.query(`INSERT INTO customer(id_customer, name, email, password, phone, 
                    gender, date_of_birth, photo, verify_token, address_id) 
                    VALUES('${id}', '${name}', '${email}', '${passwordHashed}', '${phone}', '${gender}',
                    '${date_of_birth}', '${photo}', '${verifyToken}', '${address_id}')`, 
        (err, result) => {
            if(!err){
                resolve(result);
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    findby,
    register
}