const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //_id : mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
        trim: true,
        unique: true, // username must be unique
        dropDups: true,
        lowercase: true,
        validate: {
            validator: function(username) {
                var regex = /^[a-z0-9_]+$/i;
                return regex.test(username);
            },
            message: 'Username may contain only letters, numbers or underscores.',
        },
    }, // end username field
    decks : {
        type: mongoose.Schema.Types.ObjectId, 
        //type : Schema.Types.ObjectId,
        ref : 'Deck'
    },
    lastModifiedDate : {type : Date, default : () => {return new Date()}}
}, 
{
    minimize : false, 
    toObject : {
        retainKeyOrder : true
    }
}
);

module.exports = mongoose.model('User', userSchema);