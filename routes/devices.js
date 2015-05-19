var express = require('express');
var router = express.Router();
var mysql = require ('../helpers/mysql-pool');
var debug = require('debug')('smart-home:devices');

// list of devices
router.get('/', function(req, res, next) {
    debug('devices');
    mysql.connection(function (err, connection) {
        if (err) next(err);
        connection.query('SELECT * FROM `devices`', function (err, rows, fields) {
            connection.release();
            if (err) next(err);
            res.json(rows)
        });
    });
});
router.post('/', function (req, res, next) {
    debug('insert device');
    mysql.connection(function (err, connection) {
        if (err) return next(err);
        connection.query('INSERT INTO `devices` (`id`, `title`, `description`) VALUES (NULL, ?, ?)',[req.body.title, req.body.description], function (err, rows, fields) {
            if (err) {
                connection.release();
                return next(err);
            }
            connection.query('SELECT * FROM `devices` WHERE `id`= LAST_INSERT_ID()', function (err, rows) {
                connection.release();
                if (err) return next(err);
                res.json(rows[0])
            });
        })
    });
});
router.get('/:id', function (req, res, next) {
    debug('device with id', req.params.id);
    mysql.connection(function (err, connection) {
        if (err) next(err);
        connection.query('SELECT * FROM `devices` WHERE id = ?',[req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) return next(err);
            res.json(rows[0] || {});
        })
    });
});
router.put('/:id', function (req, res, next) {
    debug('device update with id', req.params.id);
    mysql.connection(function (err, connection) {
        if (err) next(err);
        connection.query('UPDATE `devices` SET ? WHERE id = ?',[{title: req.body.title, description: req.body.description}, req.params.id], function (err, rows, fields) {
            if (err) {
                connection.release();
                return next(err);
            }
            connection.query('SELECT * FROM `devices` WHERE `id`= ?', [req.params.id], function (err, rows) {
                connection.release();
                if (err) return next(err);
                res.json(rows[0]);
            });
        })
    });
});
router.put('/:id', function (req, res, next) {
    debug('device update with id', req.params.id);
    mysql.connection(function (err, connection) {
        if (err) next(err);
        connection.query('UPDATE `devices` SET ? WHERE id = ?',[{title: req.body.title, description: req.body.description}, req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) {
                next(err);
                return;
            }
            connection.query('SELECT * FROM `devices` WHERE `id`= ?', [req.params.id], function (err, rows) {
                connection.release();
                if (err) next(err);
                res.json(rows[0]);
            });
        })
    });
});
router.delete('/:id', function (req, res, next) {
    debug('delete device with id', req.params.id);
    mysql.connection(function (err, connection) {
        if (err) next(err);
        connection.query('DELETE FROM `devices` WHERE id = ?',[req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) return next(err);
            res.status(200).json();
        })
    });
});
module.exports = router;
