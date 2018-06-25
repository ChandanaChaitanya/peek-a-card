const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const utility = require('../common/utility');
const deckCommon = require('../common/decks');
const Deck = require('../db/models/deck');
const Category = require('../db/models/category');


//HTTP method : GET
//URI : /decks/
//get all decks
/**
 * retuns all the decks along with their category _ids
 */
router.get('/', (req, res, next) => {
    deckCommon.getAllDecks()
    .then(result => {
        res.status(200).json(result).end();
    }).catch(error => {
        console.log(`Error getting available decks. Error info is : ${error.stack}`);
        utility.errorResponse(res, error, "Error getting decks", 500);
    });
});

//HTTP method : GET
//URI : /decks/:deckName
//get all the cards by deckName - TO BE FIXED
router.get('/:deckName', (req, res, next) => {
    let deck = req.params.deckName;
    deckCommon.getDeckByDeckName(deck)
    .then(result => {
        res.status(200).json(result).end();
    }).catch(error => {
        console.log(`Error getting deck data for ${deck}. Error info is : ${error.stack}`);
        utility.errorResponse(res, error, "Error getting deck data", 500);
    });
});

//HTTP method: POST
//URI: /decks/save/:deckName
//Expects: category_name from headers
//Key: category and Value: category_name
//add a deck
router.post('/save/:deckName', (req, res, next) => {
    let deckName = req.params.deckName;
    let catName = req.headers.category;
    let data = req.body;
    data.deckName = req.params.deckName;

    deckCommon
    .saveDeck(data, deckName, catName)
    .then(result => {
        res.status(200).json({
            message : "entry successfully added to database",
            deck : result
        }).end();
    }).catch(error => {
        console.log(`Error saving deck to database. Error info is : ${error.stack}`);
        utility.errorResponse(res, error, "Error while inserting deck", 500);
    });  
});

module.exports = router;