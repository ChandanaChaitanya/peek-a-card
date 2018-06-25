const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const deckRoutes = require('./api_modules/routes/decks');
const categoryRoutes = require('./api_modules/routes/categories');
const userRoutes = require('./api_modules/routes/users');

//connect to mongodb installed locally
mongoose.connect('mongodb://localhost:27017/peekACard');

//logs all requests by funnelling them through morgan middleware
app.use(logger('dev'));

//use bodyParser to parse request body that contains URL encoding and JSON data
//this will extract JSON data and makes it easily readable
const jsonParser = bodyParser.json({
    limit : 1024*1024*20,
    type : 'application/json'
});
app.use(jsonParser);

//allows to parse extended bodies with rich data in it if extended is set to true
const urlEncodedParser = bodyParser.urlencoded({
    extended : true,
    limit : 1024*1024*20,
    type : 'application/x-www-form-urlencoding'
});
app.use(urlEncodedParser);

//Handling CORS by adding headers to the response 
//so that the browser on the client allows interaction though both client and server are on different origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
});

//app.use('/users', userRoutes);
app.use('/decks', deckRoutes);
app.use('/category', categoryRoutes);

//control reaches this line if none of the above routes were matched
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//if any operation fails e.g. database operation, then error is thrown and the control reaches this block
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;