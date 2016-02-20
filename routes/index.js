var express = require('express');
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../db');

var router = express.Router();

module.exports = function(io) {
    
    router.use(express.static(__dirname + '/public'));

    router.get('/', function (req, res) {
      var list = tweetBank.list();
      res.render( 'index', { title: 'Twitter.js', tweets: list, showForm: true, nameValue: ''} );
    });

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
    
    return router
};