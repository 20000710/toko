const Pool = require('../config/db')

const findby = (row, keyword) => {
    return new Promise((resolve, reject) => {
        Pool.query(
            `SELECT * FROM seller WHERE ${row} = '${keyword}'`,
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
    console.log('data: ', data)
    const {  
        id,
        name,
        email,
        passwordHashed,
        phone,
        store_name,
        address,
        verifyToken
    } = data
    return new Promise ((resolve, reject) => {
        Pool.query(`INSERT INTO seller(id_seller, name, email, phone, store_name, password, address, verify_token) 
                    VALUES('${id}', '${name}', '${email}', '${phone}', '${store_name}', '${passwordHashed}', '${address}', '${verifyToken}')`, 
        (err, result) => {
            console.log('err: ', err)
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
