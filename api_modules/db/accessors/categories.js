const Category = require('../models/category');
const utility = require('../../common/utility');
//const mongoose = require('mongoose');

//To limit the amount of data mongodb sends
const projection = {
    //_id : false,
    lastModifiedDate : false,
    __v : false
};
const selectProjection = {
    select : projection,
    passRawResult : true
};

function getAllCategories() {
    return Category.find({}, projection)
    .sort({ categoryName : "ascending"})
    .then(categories => {
        if(categories.length > 0) {
            return categories;
        }else {
            utility.returnError("No entries found in database!")
        }       
    });
}

function saveCategory(data) {
    //data._id = new mongoose.Types.ObjectId();
    return Category
    .findOne({ categoryName : data.categoryName}, projection)
    .then( dbCategory => {
        if(!dbCategory) {
            return insert(data);
        } else {
            throw new Error( 'Category already exists' ); 
        }

    });
}

function insert (data) {
    let category = new Category(data);
    return category
    .save()
    .then(result => {
        return result;  
    });
}

function updateCategory(editCategory, data) {
    console.log(JSON.stringify(data));
    return Category
    .findOne({ categoryName : editCategory}, projection)
    .then( dbCategory => {
        if(dbCategory) {
            return update(editCategory, data);
        } else {
            throw new Error( 'Category does not exit! Please create a new one.' ); 
        }

    });
}

function update (editCategory, data) {
    return Category
    .findOneAndUpdate({categoryName : editCategory}, {$set : data}, 
        {new : true, fields : projection, passRawResult : true})
    .then(result => {      
            return result;
    });
}

function removeCategory(deleteCategory) {
    return Category
    .findOneAndRemove({categoryName : deleteCategory}, selectProjection)
    .then( deletedObj => {  
        if (deletedObj != null) {
            return deletedObj;
        } else {
            return "No such category present!";
        }            
    });
}

module.exports = {
    getAllCategories,
    saveCategory,
    updateCategory,
    removeCategory
};
