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

var widgets1 = [
    {id: 'v1', name: 'widget1', text: 'test message from server- widget1'},
    {id: 'v2', name: 'widget2', text: '<b>test message from server- putin huilo</b>'},
    {id: 'v3', name: 'widget3', text: '<h1><span style="color: red; ">google</span></h1>', link: 'https://www.google.com'}
];
var widgets2 = [
    {id: 'v21', name: 'widget1', image: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABySURBVDhP7Y7RDcAgCERdrls4EXt2DsoRMRhRU/rbj+flgLtYmPkT+hARR/hD8TXa9wLoCbkbSjCzhZoTcncJd6qghRGE6k8wt6WaFS2kYTerUDMicxBEYY8dicxLsAsDfXYFKywzmDf8BUFBhl6Qh8sDHpXcScsZN1EAAAAASUVORK5CYII='},
    {id: 'v22', name: 'widget2', text: '<b>test message from server- widget2 putin huilo</b>'}
];
var dashboards = [
    {name: 'first from db', id: 'dash1'},
    {name: 'second from db', id: 'dash2'}
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
        if(dashboardId === "dash1")
            return widgets1;
        else return widgets2
    }
};
module.exports.dashboard = dashboard;
module.exports.widget = widget;