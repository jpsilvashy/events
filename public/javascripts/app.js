$(function(){

  // $('.ui.checkbox').checkbox();

  var socket = io.connect(window.location.hostname);

  $('#transport').html(io.transports);

  socket.on('event', function(data) {
    console.log(this);
    // console.log(data);
    $('#events').append('<li>' + data + '</li>')
    $('#transport').html(io.transports);
  });

  socket.on('error', function(event) {
    console.log('error');
    $('#status').html('error connecting to stream');
    $('#transport').html(io.transports);
  });

  socket.on('connect', function(event) {
    console.log('connect');
    $('#status').html('connected')
    $('#transport').html(io.transports);
  });

  socket.on('disconnect', function(event) {
    console.log('disconnected from stream');
    $('#status').html('disconnect')
    $('#transport').html(io.transports);
  });

  socket.on('newListener', function(event) {
    console.log('newListener');
    $('#transport').html(io.transports);
  });

});
