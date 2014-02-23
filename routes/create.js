// Handle post requests to /
exports.create = function(req, res) {

  console.log('post recieved!')
  console.log(req.body)

  publisher.publish(req.body.channel || "events", JSON.stringify(req.body));
  res.send(200);
};
