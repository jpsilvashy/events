/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http');

var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

// Redis
if (process.env.REDISTOGO_URL) {
  var redisUrl = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis").createClient(redisUrl.port, redisUrl.hostname);
  redis.auth(redisUrl.auth.split(":")[1]);
} else {
  redis = require("redis").createClient();
}

redis.on("error", function (err) {
  console.log("Error " + err);
});

app.configure(function(){
  app.set('views', __dirname + '/views');

  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/bower_components'));

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var messageCount = 0;
var subscriber = redis;
// var channel = req.params.channel;
var channel = "events.*";

subscriber.psubscribe(channel);

subscriber.on("pmessage", function(pattern, channel, message) {
  messageCount++; // Increment our message count
  console.log(pattern, channel, message);
  io.sockets.emit('event', message);
});

io.sockets.on('connection', function(socket) {
  console.log('socket.id: ', socket.id);
  socket.emit('event', 'connected');
});

app.get('/', routes.index);

console.log("Express server listening on port 3000");