exports.emit = function(socket, pattern, channel, message) {
  messageCount++; // Increment our message count

  if (typeof message === 'string') {
    message = JSON.parse(message);
  }

  // form message
  var message = {
    message: message,
    timestamp: new Date(),
    params: { test: 'params' },
    channel: channel
  }

  // emit message to sockets
  console.log('event', JSON.stringify(message));
  socket.emit('event', JSON.stringify(message));
  socket.broadcast.emit('user connected');
};

