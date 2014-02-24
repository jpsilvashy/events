// Handle post requests to /
exports.create = function(req, res) {

  console.log('post recieved!')
  console.log(req.body)

  var timestamp = req.query.timestamp || Date.now()
  var params = req.query.params || {}

  publisher.publish(req.body.channel || "events", JSON.stringify(req.body));
  res.send(200);
};
