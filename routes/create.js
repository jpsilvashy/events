// Handle post requests to /
exports.create = function(req, res) {

  var message = {
    message: JSON.stringify(req.body) || 'POST recieved',
    timestamp: req.body.timestamp || new Date(),
    params: { lorem: 'ipsum' }
  }

  console.log(message);

  publisher.publish('events.foo', message.message);
  res.send(200);
};
