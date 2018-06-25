const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    //_id : Schema.Types.ObjectId,
    categoryName : {
        type : String, 
        required : true, 
        unique : true,
        dropDups: true
    },
    categoryDesc : {type : String},
    //categoryImage : { data: Buffer, contentType: String },
    lastModifiedDate : {type : Date, default : () => {return new Date()}}
}, 
{
    minimize : false, 
    toObject : {
        retainKeyOrder : true
    }
}
);

module.exports = mongoose.model('Category', categorySchema);