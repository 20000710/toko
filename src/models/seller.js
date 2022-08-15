const Pool = require('../config/db')

const getAllSellers = ({limit, offset, sort, sortby}) => {
    return Pool.query(`SELECT * FROM seller ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const getSeller = (id) => {
    return Pool.query(`SELECT * FROM seller WHERE id_seller=${id}`);
}

const insertSeller = (username, password, name, email, phone, address) => {
    return Pool.query(
        `INSERT INTO seller(username, password, name, email, phone, address) 
        VALUES(
            '${username}', crypt('${password}', 'bf'), '${name}', '${email}', ${phone},  '${address}')`
    );
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
    getAllSellers,
    getSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countSeller,
}