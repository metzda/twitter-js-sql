var express = require('express');
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../db');

var router = express.Router();

function cbSuccess(res, view, content, attribute) {
    return function(data) {
        content[attribute] = data;
        res.render(view, content);
    };
};
function cbErr(res) {
    return function(err) {
        res.status(400).end(err);
    };
};

module.exports = function(io) {
    
    router.use(express.static(__dirname + '/public'));

    router.get('/', function (req, res) {
      tweetBank.list('Tweet', 'User', cbSuccess(res, 'index', { title: 'Twitter.js', showForm: true, nameValue: ''}, 'tweets'), cbErr(res));
    });
/*
    router.get('/users/:name', function(req, res) {
      var name = req.params.name;
      var list = tweetBank.find( 'name', name );
      res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, nameValue: name} );
    });

    router.get('/tweets/:date', function(req, res) {
      var date = +req.params.date;
      var list = tweetBank.find( 'date', date);
      res.render( 'index', { title: 'Twitter.js - Tweet date ' + date, tweets: list, showForm: false } );
    });

    router.post('/tweets', function(req, res) {
        var name = req.body.name;
        var text = req.body.text;
        tweetBank.add(name, text);
        res.redirect('/');
    });
    */
    return router
};