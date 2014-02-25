// handle get requests to site index
exports.index = function(req, res) {

  console.log(req.session);

  var channel = req.query.channel || 'events.*';
  console.log(channel);

  res.render('index', { channel: channel });
};
