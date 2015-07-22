/**
 * Created by Eless on 19.07.2015.
 */
var mysql = require('mysql');
var config = require('../config/index');
var mysqlUtilities = require('mysql-utilities');

var connection = mysql.createConnection(process.env.NODE_ENV == 'development' ? config.get('dbConfig')
    :
{
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "user": process.env.DB_LOGIN,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME
});
// Mix-in for Data Access Methods and SQL Autogenerating Methods
mysqlUtilities.upgrade(connection);
// Mix-in for Introspection Methods
mysqlUtilities.introspection(connection);

var dashboard = {
    add: function(name){

    },
    remove: function(id){

    },
    getList: function(){
        return [];
    }
};
var widget = {
    add: function(dashboardId, widget){

    },
    remove: function(id){

    },
    getList: function(dashboardId){
        return [];
    }
};
module.exports.dashboard = dashboard;
module.exports.widget = widget;