/**
 * Created by Eless on 20.07.2015.
 */
var log = require('models/log')(module);
var db = require('models/db');
var dashboards = require('model/dashboards');


exports.router = function(req, res){
    res.send('dashboards', {
        dashboards: dashboards
    });
};