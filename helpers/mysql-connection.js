
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'alexeybondarenko',
    password : 'w3ENRemdEJSR4dx2',
    database : 'sh'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

module.exports = connection;