// handle get requests to site index
exports.index = function(req, res) {

  var channel = req.query.channel || 'events.*';
  console.log(channel);

  res.render('index', { channel: channel });
};
