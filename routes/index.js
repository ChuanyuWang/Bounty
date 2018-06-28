var express = require('express');
var router = express.Router();
var RateLimit = require('express-rate-limit');
//var connectionMgr = require('../util');
//var assert = require('assert');

var loginLimiter = new RateLimit({
    windowMs: 1000 * 60, // 1 minutes
    max: 5, // limit each IP to 10 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
    // Error message returned when max is exceeded.
    message: "Too many login requests, please try again later."
});

/* GET home page. */
router.get('/', loginLimiter, function(req, res) {
    res.render('index', {
        title: res.__('title'),
        navTitle: res.__('title')
    });
});

module.exports = router;