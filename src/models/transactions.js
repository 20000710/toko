const Pool = require('../config/db')

const getAllTransactions = ({limit, offset, sort, sortby}) => {
    return Pool.query(`SELECT * FROM transactions ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const getTransactions = (id) => {
    return Pool.query(`SELECT * FROM transactions WHERE id_transactions=${id}`);
}

const insertTransactions = (
    product_id,
    quantity, 
    total_amount, 
    payment_type, 
    payment_status, 
    shipped_date, 
    transaction_status,
    customer_id,
    seller_id) => {
    return Pool.query(
        `INSERT INTO 
        transactions(
            product_id, quantity, total_amount, payment_type, payment_status, shipped_date, transaction_status, customer_id, seller_id
        ) 
        VALUES(
            ${product_id}, ${quantity}, ${total_amount}, '${payment_type}', '${payment_status}', '${shipped_date}',  '${transaction_status}', ${customer_id}, ${seller_id}
        )`
    );
}

const updateTransactions = (
    id,
    product_id,
    quantity, 
    total_amount, 
    payment_type, 
    payment_status, 
    shipped_date, 
    transaction_status,
    customer_id,
    seller_id) => {
    return Pool.query(
        `UPDATE transactions SET 
            product_id=${product_id}, quantity=${quantity}, total_amount=${total_amount}, payment_type='${payment_type}', payment_status='${payment_status}', shipped_date='${shipped_date}', transaction_status='${transaction_status}', customer_id=${customer_id}, seller_id=${seller_id}
        WHERE id_transactions=${id}
        `
    );
}

const deleteTransactions = (id) => {
    return Pool.query(`DELETE FROM transactions WHERE id_transactions=${id}`);
}

const countTransactions = () => {
    return Pool.query(`SELECT COUNT(*) FROM transactions`);
}


module.exports = {
    getAllTransactions,
    getTransactions,
    insertTransactions,
    updateTransactions,
    deleteTransactions,
    countTransactions,
}