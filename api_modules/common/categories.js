const db = require('../db/accessors/categories');
const utility = require('./utility');

function getAllCategories() {
    return db.getAllCategories().then(categories => {   
        return categories;
    });
}

function saveCategory(data) {
    return db.saveCategory(data).then(result => {
        return result;
    })
}

function updateCategory(editCategory, data) {
    return db.updateCategory(editCategory, data).then(result => {
        return result;
    })
}

function deleteCategory(deleteCategory) {
    return db.removeCategory(deleteCategory).then(result => {
        return result;
    })
}

module.exports = {
    getAllCategories,
    saveCategory,
    updateCategory,
    deleteCategory
};