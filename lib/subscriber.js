messageCount = 0;
// var channel = req.params.channel;
channel = "events.*";

subscriber.psubscribe(channel);

subscriber.on("pmessage", function(pattern, channel, message) {
  messageCount++; // Increment our message count

  var message = JSON.parse(message);

  console.log(pattern, channel, message);

  io.sockets.emit('event', message);
});

