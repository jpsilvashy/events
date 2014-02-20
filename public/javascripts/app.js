function insertIntoStream(data) {
  console.log(data);
  $('#events').prepend('<div class="event"><div class="content">' + data.message + '</div></div>')
}

function updateStatus(status, color) {
  console.log(status);
  $('#status').html("<span class='ui " + color + " label'>" + status + "</span>");
  $('#transport').html(io.transports.join(", "));
}

$(function(){

  $('.ui.checkbox').checkbox();

  var socket = io.connect(window.location.hostname);

  $('#transport').html(io.transports.join(", "));

  socket.on('event', function(data) {
    insertIntoStream(data);
  });

  socket.on('error', function(event) {
    updateStatus('error', 'red');
  });

  socket.on('connect', function(event) {
    updateStatus('connected', 'green');
  });

  socket.on('disconnect', function(event) {
    updateStatus('disconnected', 'red');
  });

  socket.on('newListener', function(event) {
    console.log('newListener');
  });

});
