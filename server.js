/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  create = require('./routes/create'),
  http = require('http');

var port = process.env.PORT || 8080;

var app = express();
var server = app.listen(port);
var io = require('socket.io').listen(server);

// Redis
if (process.env.REDISTOGO_URL) {
  var redisUrl = require("url").parse(process.env.REDISTOGO_URL);
  subscriber = require("redis").createClient(redisUrl.port, redisUrl.hostname);
  subscriber.auth(redisUrl.auth.split(":")[1]);

  publisher = require("redis").createClient(redisUrl.port, redisUrl.hostname);
  publisher.auth(redisUrl.auth.split(":")[1]);

} else {
  subscriber = require("redis").createClient();
  publisher = require("redis").createClient();
}

subscriber.on("error", function (err) {
  console.log("Error " + err);
});

publisher.on("error", function (err) {
  console.log("Error " + err);
});

app.configure(function(){
  app.set('views', __dirname + '/views');

  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html');
  app.set('port', 'html');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/bower_components'));

  app.use(express.json());
  app.use(express.urlencoded());
  // app.use(express.multipart());

  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// handle Redis subscribers
require('./lib/subscriber');

app.get('/', routes.index);
app.post('/', create.create); // for posting new events

io.sockets.on('connection', function(socket) {
  console.log('socket.id: ', socket.id);
  socket.emit('event', { message: 'connected', timestamp: Date.now(), params: {} });
});

console.log("Express listening on " + port);

