var express = require('express'),
  routes = require('./routes'),
  create = require('./routes/create'),
  http = require('http');

var app = express();
var server = app.listen(process.env.PORT || 8080);
var io = require('socket.io').listen(server);

var messageHandler = require('./lib/message');

// Redis
if (process.env.REDISTOGO_URL) {
  var redisUrl = require("url").parse(process.env.REDISTOGO_URL);

  // Create subscriber connection to redis
  subscriber = require("redis").createClient(redisUrl.port, redisUrl.hostname);
  subscriber.auth(redisUrl.auth.split(":")[1]);

  // Create publisher connection to redis
  publisher = require("redis").createClient(redisUrl.port, redisUrl.hostname);
  publisher.auth(redisUrl.auth.split(":")[1]);

  sessionStore = require("redis").createClient(redisUrl.port, redisUrl.hostname);
  sessionStore.auth(redisUrl.auth.split(":")[1]);

} else {
  subscriber = require("redis").createClient();
  publisher = require("redis").createClient();

  sessionStore = require("redis").createClient();
}

RedisStore = require("connect-redis")(express);

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

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/bower_components'));

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.cookieParser());
  app.use(express.session({
    store: new RedisStore({ client: sessionStore }),
    secret: '1234567890QWERTY',
    key: 'events'
  }));

  app.use(express.methodOverride());
  app.use(app.router);
});


app.configure('development', function() {
  app.use(express.errorHandler());
});

io.sockets.on('connection', function(socket) {
  messageHandler.emit(socket, '*', '*', { message: 'connected'})
});


// Handle subscribers
messageCount = 0;
channel = "events.*";

subscriber.psubscribe(channel);

subscriber.on("pmessage", function(pattern, channel, message) {
  messageHandler.emit(io.sockets, pattern, channel, message)
});

app.get('/', routes.index);
app.post('/', create.create);

console.log("Express listening");

