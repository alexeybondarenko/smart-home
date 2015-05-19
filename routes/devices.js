var express = require('express');
var router = express.Router();
var mysql = require ('../helpers/mysql-connection');

// list of devices
router.get('/', function(req, res, next) {
    mysql.query('SELECT * FROM `devices`', function (err, rows, fields) {
        if (err) next(err);
        console.log(rows, fields);
        res.json({
            devices: rows
        })
    });
  //res.json({ title: 'Express' });
});

module.exports = router;
