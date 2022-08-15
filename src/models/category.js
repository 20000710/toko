const Pool = require('../config/db')

const getAllCategories = ({limit, offset, sort, sortby}) => {
    return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const searchingCategories = ({input}) => {
    return Pool.query(`SELECT * FROM category WHERE name LIKE '${input}%'`)
}

const getCategory = (id) => {
    return Pool.query(`SELECT * FROM category WHERE id_category=${id}`);
}

const insertCategory = (name) => {
    return Pool.query(`INSERT INTO category(name) VALUES('${name}')`);
}

const updateCategory = (id, name) => {
    return Pool.query(`UPDATE category SET name='${name}' WHERE id_category=${id}`);
}

const deleteCategory = (id) => {
    return Pool.query(`DELETE FROM category WHERE id_category=${id}`);
}

const countCategory = () => {
    return Pool.query(`SELECT COUNT(*) FROM category`);
}


module.exports = {
    getAllCategories,
    searchingCategories,
    getCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    countCategory,
}