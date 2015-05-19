
var mysql      = require('mysql');
var debug = require('debug')('smart-home:mysql');
var pool      =    mysql.createPool({
    connectionLimit : 10, //important
    host     : 'localhost',
    user     : 'alexeybondarenko',
    password : 'w3ENRemdEJSR4dx2',
    database : 'sh',
    debug    :  false
});

debug('creating mysql connection pool');

function getConnection (cb) {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            cb(err);
            return;
        }
        //connection.on('error', function(err) {
        //    cb(err);
        //    return;
        //});
        debug('connected as id ' + connection.threadId);
        cb(null, connection);
    });
}

module.exports.connection = getConnection;