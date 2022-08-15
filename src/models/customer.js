const Pool = require('../config/db')

const getAllCustomers = ({limit, offset, sort, sortby}) => {
    return Pool.query(`SELECT * FROM customer ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const searchingCustomers = ({input}) => {
    return Pool.query(`SELECT * FROM customer 
    WHERE 
    id, 
    username, 
    password, 
    name, 
    email, 
    phone, 
    gender, 
    date_of_birth, 
    city, 
    address,
    postal_code 
    LIKE '${input}%'`)
}

const getCustomer = (id) => {
    return Pool.query(`SELECT * FROM customer WHERE id_customer=${id}`);
}

const insertCustomer = (
    username, 
    password, 
    name, 
    email, 
    phone, 
    gender, 
    date_of_birth, 
    city, 
    address,
    postal_code) => {
    return Pool.query(
        `INSERT INTO 
        customer(
            username, password, name, email, phone, gender, date_of_birth, city, address, postal_code
        ) 
        VALUES(
            '${username}', crypt('${password}', 'bf'), '${name}', '${email}', ${phone}, '${gender}', '${date_of_birth}', '${city}', '${address}', ${postal_code}
        )`
        );
    }

const updateCustomer = (
    id, 
    username, 
    password, 
    name, 
    email, 
    phone, 
    gender, 
    date_of_birth, 
    city, 
    address,
    postal_code) => {
    return Pool.query(
        `UPDATE customer SET 
            username='${username}', password=crypt('${password}', 'bf'), name='${name}', email='${email}', phone=${phone}, gender='${gender}', data_of_birth='${date_of_birth}', city='${city}', address='${address}', postal_code=${postal_code} 
        WHERE id_customer=${id}`
        );
}

const deleteCustomer = (id) => {
    return Pool.query(`DELETE FROM customer WHERE id_customer=${id}`);
}

const countCustomer = () => {
    return Pool.query(`SELECT COUNT(*) FROM customer`);
}


module.exports = {
    getAllCustomers,
    searchingCustomers,
    getCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countCustomer,
}