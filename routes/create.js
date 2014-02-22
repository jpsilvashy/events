// Handle post requests to /
exports.create = function(req, res) {
  publisher.publish(req.body.channel || "events", JSON.stringify(req.body));
  res.send(200);
};
