/**
 * Created by Eless on 20.07.2015.
 */
var log = require('models/log')(module);
var db = require('models/db');
var dashboards = require('models/dashboards');


exports.sendDashboards = function(req, res){
    dashboards.getList(res.send, res);
};
exports.sendWidgets = function(req, res){
    res.send(dashboards.getWidgets(req.params.id));
};