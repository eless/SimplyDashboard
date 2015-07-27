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
var dashboards = [
    {name: 'first from db', id: '1'},
    {name: 'second from db', id: '2'}
];
var widgets = [
    {id: 'v1', name: 'widget1', controlType: 'text', value: 'test message from server- widget1'},
    {id: 'v2', name: 'widget2', controlType: 'text', value: 'test message from server- putin huilo'}
];
var dashboard = {
    add: function(name){

    },
    remove: function(id){

    },
    getList: function(){
        return dashboards;
    }
};
var widget = {
    add: function(dashboardId, widget){

    },
    remove: function(id){

    },
    getList: function(dashboardId){
        return widgets;
    }
};
module.exports.dashboard = dashboard;
module.exports.widget = widget;