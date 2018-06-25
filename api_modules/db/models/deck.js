const mongoose = require('mongoose');
const Category = require('./category');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    //_id : Schema.Types.ObjectId,
    //createdUser : mongoose.Schema.Types.ObjectId,
    deckName : {type : String, unique : true, required : true},
    deckDesc : {type : String},
    //deckImage : {data: Buffer, contentType: String},
    //isExpert : {type : Boolean, default : false},
    //isFav : {type : Boolean, default : false},
    category : {
        type : mongoose.Schema.Types.ObjectId, 
      // type : Schema.Types.ObjectId, 
       ref : 'Category'
    },
    cards : {type : Schema.Types.Mixed},
    lastModifiedDate : {type : Date, default : () => {return new Date()}}
}, 
{
    minimize : false, 
    toObject : {
        retainKeyOrder : true
    }
} 

);

module.exports = mongoose.model('Deck', deckSchema);