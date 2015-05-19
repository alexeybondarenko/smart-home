var express = require('express');
var router = express.Router();

var mysql = require ('../helpers/mysql-pool');
var debug = require('debug')('smart-home:logs');

router.post('/', function (req, res, next) {
    debug('insert log');
    mysql.connection(function (err, connection) {
        if (err) return next(err);
        connection.query('INSERT INTO `logs` (`id`, `date`, `text`, `device_id`) VALUES (NULL, CURRENT_TIMESTAMP, ?, ?);',[req.body.text, req.body.device_id], function (err, rows, fields) {
            if (err) {
                connection.release();
                return next(err);
            }
            connection.query('SELECT * FROM `logs` WHERE `id`= LAST_INSERT_ID()', function (err, rows) {
                connection.release();
                if (err) return next(err);
                res.json(rows[0])
            });
        })
    });
});

router.get('/:id', function (req, res, next) {
    debug('log with id', req.params.id);
    mysql.connection(function (err, connection) {
        if (err) next(err);
        connection.query('SELECT * FROM `logs` WHERE `id`= ?', [req.params.id], function (err, rows) {
            connection.release();
            if (err) return next(err);
            res.json(rows[0]);
        });
    });
});
router.delete('/:id', function (req, res, next) {
    debug('delete log with id', req.params.id);
    mysql.connection(function (err, connection) {
        if (err) next(err);
        connection.query('DELETE FROM `logs` WHERE id = ?',[req.params.id], function (err, rows, fields) {
            connection.release();
            if (err) return next(err);
            res.status(200).json();
        })
    });
});

module.exports = router;
