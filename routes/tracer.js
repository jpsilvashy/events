// Handle post requests to /
exports.plot = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST,OPTIONS");

  console.log(req.body);
  console.log(req.params);

  publisher.publish('events.tracer', { message: 'tracer events recieved'});
  res.send(200);
};
