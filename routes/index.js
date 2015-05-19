var express = require('express');
var router = express.Router();
var mysql = require ('../helpers/mysql-pool');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({ title: 'Express' });
});

module.exports = router;
