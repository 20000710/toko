const Pool = require('../config/db')

const findEmail = (email) => {
    return new Promise ((resolve, reject) => {
        Pool.query(`SELECT * FROM users WHERE email='${email}'`,
        (err, result) => {
            if(!err){
                resolve(result);
            } else{
                reject(err)
            }
        })    
    })
}

const create = (data) => {
    const {id, email, passwordHash, fullname, role} = data
    return new Promise ((resolve, reject) => {
        Pool.query(`INSERT INTO users(id, email, password, fullname, role) 
                    VALUES('${id}', '${email}', '${passwordHash}', '${fullname}', '${role}')`, 
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
    findEmail,
    create
}