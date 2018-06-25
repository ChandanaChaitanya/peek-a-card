const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const utility = require('../common/utility');
const categoryCommon = require('../common/categories');
const Category = require('../db/models/category');

//HTTP method : GET
//URI : /category/
//get all categories
router.get('/', (req, res, next) => {
    categoryCommon.getAllCategories()
    .then(result => {
        res.status(200).json(result).end();
    }).catch(error => {
        console.log(`Error getting available categories. Error info is : ${error.stack}`);
        utility.errorResponse(res, error, "Error getting categories", 500);
    });
});

//HTTP method : POST
//URI : /category/save
//add a category
/**
 * TODO: implement projection in accessors
 * __v is returned as part of response
 */
router.post('/save', (req, res, next) => {
    let data = req.body;
    categoryCommon
    .saveCategory(data)
    .then(result => {
        res.status(200).json({
            message : "entry successfully added to database",
            category : result
        }).end();
    }).catch(error => {
        console.log(`Error saving category to database. Error info is : ${error.stack}`);
        utility.errorResponse(res, error, "Error while inserting category", 500);
    });   
});

//HTTP method : PUT
//URI : /category/:categoryName
//modify a category
router.put('/:categoryName', (req, res, next) => {
    let editCategory = req.params.categoryName;
    let data = req.body;
    categoryCommon
    .updateCategory(editCategory, data)
    .then(result => {
        res.status(200).json({
            message : "Entry successfully updated!",
            category : result
        }).end();
    }).catch(error => {
        console.log(`Error updating category : ${editCategory}. Error info is : ${error.stack}`);
        utility.errorResponse(res, error, "Error while updating category", 500);
    });   
});

//HTTP method : DELETE
//URI : /category/delete/:categoryName
//delete a category
router.delete('/delete/:categoryName', (req, res, next) => {
    let delCategory = req.params.categoryName;
    categoryCommon
    .deleteCategory(delCategory)
    .then(result => {
        res.status(200).json({
            message : "Entry successfully deleted!",
            category : result
        }).end();
    }).catch(error => {
        console.log(`Error deleting category : ${delCategory}. Error info is : ${error.stack}`);
        utility.errorResponse(res, error, "Error deleting category", 500);
    });
});

module.exports = router;