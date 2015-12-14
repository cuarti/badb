
var express = require('express');

var router = new express.Router();

router.get('/', function(req, res) {
    res.send('foo');
});

module.exports = router;
