//
exports.create = function(req, res) {
  publisher.publish("events.foo", "{ \"message\" : \"from post\" }");
  res.send(200);
};
