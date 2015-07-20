var log = require('models/log')(module);
exports.router = function(req, res){
  res.render('index', {
    title: 'Dashboards'});
};
