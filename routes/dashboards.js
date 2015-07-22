/**
 * Created by Eless on 20.07.2015.
 */
var log = require('models/log')(module);
var db = require('models/db');
var dashboards = require('models/dashboards');


exports.sendDashboards = function(req, res){
    res.send(dashboards.getList());
};
exports.sendWidgets = function(req, res){
    res.send(dashboards.getWidgets(req.params.id));
};