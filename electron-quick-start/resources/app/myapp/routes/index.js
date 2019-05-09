var express = require('express');
var router = express.Router();
var Twig = require("twig");
var WebTorrent = require('webtorrent')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.twig', {
        message : "Hello World"
    });
});

module.exports = router;
