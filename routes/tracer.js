// Handle post requests to /
exports.plot = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.log(req.body);

  // publisher.publish('events.tracer', message.message);
  res.send(200);
};
