const Pool = require('../config/db')

const getAllCategories = (
    searchQuery,
    offsetValue,
    limitValue,
    sortQuery,
    modeQuery) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM category WHERE LOWER(name) LIKE '%${searchQuery}%'
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


const getDetailCategory = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM category WHERE id_category='${id}'`,
        (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        });
    })
}

const insertCategory = (data) => {
    return new Promise((resolve, reject) => {
        const {
            id,
            name,
            photo
        } = data
        Pool.query(`INSERT INTO category(id_category, name, photo) VALUES('${id}', '${name}', '${photo}')`,
        (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })
}

const updateCategory = (data) => {
    return new Promise((resolve, reject) => {
        const {
            id,
            name
        } = data
        Pool.query(`UPDATE category SET name='${name}' WHERE id_category='${id}'`,
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`DELETE FROM category WHERE id_category='${id}'`,
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

const countCategory = () => {
    return Pool.query(`SELECT COUNT(*) FROM category`);
}


module.exports = {
    getAllCategories,
    getDetailCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    countCategory,
}