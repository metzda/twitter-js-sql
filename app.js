var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var routes = require('./routes');

var app = express();

var port = 3000;
var server = app.listen(port, function(){
    console.log("We have a server running on port " + port + "!");
});

var io = socketio.listen(server);
var router = routes(io);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.set('view cache', false);

app.use(express.static(__dirname + '/public'));

app.use('/', router);
