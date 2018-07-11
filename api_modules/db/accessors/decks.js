const Deck = require('../models/deck');
const Category = require('../models/category');
const utility = require('../../common/utility');

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

function getAllDecks(){
    return Deck.find({}, projection)
    .sort({ deckName : "ascending" })
    .populate('category')
    .then(decks => {
        if(decks.length > 0) {
            return decks;
        }else {
            utility.returnError("No entries found in database!");
        }
    });
}

function getByDeckName(deckName) {
    return Deck.findOne({deckName : deckName}, projection)
    .populate('category')
    .then((deck) => {
        if (!deck) {
            utility.returnError("No valid entry found for the deck name provided!");  
        }      
        return deck;
    });
}

function saveDeck(data, deckName, catName) {
    return Deck.findOne({ deckName : deckName })
    .then( dbDeck => {
        if( !dbDeck ) {
            return Deck.create(data);
        } else {
            throw new Error( 'Deck already exists' ); 
        }
    })
    .then (addedDeck => {
        return Category
        .findOne({ categoryName : catName})
        .then( dbCategory => {
            addedDeck.category = dbCategory._id;
            return addedDeck.save();
        })
    }) 
}

module.exports = {
    getAllDecks,
    getByDeckName,
    saveDeck
};