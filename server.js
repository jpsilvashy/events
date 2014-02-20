/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http');

var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

app.configure(function(){
  app.set('views', __dirname + '/views');

  // app.set('view engine', 'jade');
  app.engine('.html', require('ejs').__express);

  app.set('view engine', 'html');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/bower_components'));
  // app.use('/bower_components', express.static(__dirname + '/bower_components'));
  // app.use('/public', express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

console.log("Express server listening on port 3000");