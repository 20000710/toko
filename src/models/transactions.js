const Pool = require('../config/db')

const getAllTransactions = (searchQuery,
    offsetValue,
    limitValue,
    sortQuery,
    modeQuery) => {
    return new Promise((resolve, reject) => {
        Pool.query(`
        SELECT * FROM transactions WHERE LOWER(id_transactions) LIKE '%${searchQuery}%'
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

const getDetailTransactions = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM transactions WHERE id_transactions='${id}'`,
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

const insertTransactions = (data) => {
    return new Promise((resolve, reject) => {
        const {
            id,
            product_id,
            quantity,
            total_amount,
            payment_type,
            payment_status,
            shipped_date,
            transaction_status,
            customer_id,
            seller_id
        } = data
        Pool.query(
            `INSERT INTO transactions(
            id_transactions, product_id, quantity, total_amount, payment_type, payment_status, 
            shipped_date, transaction_status, customer_id, seller_id) 
            VALUES(
            '${id}', '${product_id}', ${quantity}, ${total_amount}, '${payment_type}', '${payment_status}', 
            '${shipped_date}', '${transaction_status}', '${customer_id}', '${seller_id}'
            )`,
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

const updateTransactions = (data) => {
    return new Promise((resolve, reject) => {
        const {
            id,
            product_id,
            quantity,
            total_amount,
            payment_type,
            payment_status,
            shipped_date,
            transaction_status,
            customer_id,
            seller_id
        } = data
        Pool.query(
            `UPDATE transactions SET product_id='${product_id}', quantity=${quantity}, 
            total_amount=${total_amount}, payment_type='${payment_type}', 
            payment_status='${payment_status}', shipped_date='${shipped_date}', 
            transaction_status='${transaction_status}', 
            customer_id='${customer_id}', seller_id='${seller_id}' 
            WHERE id_transactions='${id}'
            `, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        }
        )
    })
}

const deleteTransactions = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM transactions WHERE id_transactions='${id}'`,
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

const countTransactions = () => {
    return Pool.query(`SELECT COUNT(*) FROM transactions`);
}


module.exports = {
    getAllTransactions,
    getDetailTransactions,
    insertTransactions,
    updateTransactions,
    deleteTransactions,
    countTransactions,
}