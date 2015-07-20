var log = require('models/log')(module);
var db = require('models/db');
exports.router = function(req, res){
  res.render('index', { user: req.user,
    title: 'Hello world test'});
};
