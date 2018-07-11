const db = require('../db/accessors/decks');
const utility = require('./utility');

function getAllDecks() {
    return db.getAllDecks().then(decks => {   
        return decks;
    });
}

function getDeckByDeckName(deckName) {
    return db.getByDeckName(deckName).then(deck => {
        return deck;
    })
}

function saveDeck(data, deckName, catName) {
    return db.saveDeck(data, deckName, catName).then(result => {
        return result;
    })
}

function deleteDeck(deleteDeck) {
    return db.removeDeck(deleteDeck).then(result => {
        return result;
    })
}

module.exports = {
    getAllDecks,
    getDeckByDeckName,
    saveDeck,
    deleteDeck
};