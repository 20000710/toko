const Pool = require('../config/db')

const findEmail = (email) => {
    return new Promise ((resolve, reject) => {
        Pool.query(`SELECT * FROM seller WHERE email='${email}'`,
        (err, result) => {
            if(!err){
                resolve(result);
            } else{
                reject(err)
            }
        })    
    })
}

const getAllSellers = ({limit, offset, sort, sortby}) => {
    return Pool.query(`SELECT * FROM seller ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const getSeller = (id) => {
    return Pool.query(`SELECT * FROM seller WHERE id_seller=${id}`);
}

const createSeller = (data) => {
    console.log('data: ', data)
    const { id, name, email, phone, store_name, passwordHash, role } = data
    return new Promise ((resolve, reject) => {
        Pool.query(`INSERT INTO seller(id, name, email, phone, store_name, password, role) 
                    VALUES('${id}', '${name}', '${email}', '${phone}', '${store_name}' '${passwordHash}', '${role}')`, 
        (err, result) => {
            console.log('err: ', err)
            if(!err){
                resolve(result);
            } else {
                reject(err)
            }
        })
    })

    // return Pool.query(
    //     `INSERT INTO seller(name, email, phone, store_name, password, role) 
    //     VALUES('${name}', '${email}', '${phone}', '${store_name}' '${passwordHash}', '${role}')`);
}

const updateSeller = (id, username, password, name, email, phone, address) => {
    return Pool.query(
        `UPDATE seller SET 
            username='${username}', name='${name}', password=crypt('${password}', 'bf'), email='${email}', phone=${phone}, address='${address}' 
        WHERE id_seller=${id}
        `
    );
}

const deleteSeller = (id) => {
    return Pool.query(`DELETE FROM seller WHERE id_seller=${id}`);
}

const countSeller = () => {
    return Pool.query(`SELECT COUNT(*) FROM seller`);
}


module.exports = {
    findEmail,
    getAllSellers,
    getSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    countSeller,
}