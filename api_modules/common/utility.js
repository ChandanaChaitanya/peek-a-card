
/*function returnError(message, errorCode) {
    let msg = {
        message : message,
        errorCode : errorCode
    }
    throw new Error(msg);
}*/

function returnError(msg) {
    throw new Error(msg);
}

function successResponse(res, msg, statusCode) {
    try {
        res.status(statusCode).json({
            status : statusCode,
            message : msg
        }).end();
    } catch (err) {
        console.log("Error generating success JSON response : " + err.stack);
    }
}

function errorResponse(res, err, msg, errorCode) {
    try {
        res.status(errorCode).json({
            status : errorCode,
            message : msg
        }).end();
    } catch (err) {
        console.log("Error generating error JSON response : " + err.stack);
    }
}

function validJson(msg) {
    if(typeof msg == 'object') {
        try {
            msg = JSON.stringify(msg); 
        } catch (err) {
            return false;
        }
    }
    if(typeof msg == 'string') {
        try {
            msg = JSON.parse(msg); 
        } catch (err) {
            return false;
        }  
    }
    if(typeof msg != 'object') {
        return false;
    }
    return true;
}


module.exports = {
    successResponse,
    errorResponse,
    returnError,
    validJson
};