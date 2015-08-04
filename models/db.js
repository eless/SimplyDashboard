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
    add: function(name, callback){
        connection.query("INSERT INTO `dashboard` (`name`) VALUES (?)", name,
            function(error, results){
                if(error) throw error;
                callback.call(this, results);
            });
    },
    remove: function(id, callback, scope){
        var scope = scope || this;
        connection.delete('dashboard', { Id: id }, function(err, affectedRows) {
            if(err) throw err;
            if(callback){
                callback.call(scope, affectedRows);
            }
        });
    },
    getList: function(callback, scope){
        var scope = scope || this;
        var query = 'SELECT * FROM dashboard';
        connection.query(query, function(error, result){
            if(error) throw error;
            if(callback) {
                callback.call(scope, result);
            }
            else return result;
        });
    }
};
var widget = {
    add: function(widget){
        connection.query("INSERT INTO `widget` (`dashboardId`, `name`, `text`, `link`, `image`) VALUES ?", [[widget.data]],
            function(error, results){
                if(error) throw error;
            });
    },
    remove: function(id){

    },
    getList: function(dashboardId, callback){
        connection.select('widget', '*', { dashboardId: dashboardId }, function(error, results){
            if(error) throw error;
            callback.call(this, results);
        });
    }
};
module.exports.dashboard = dashboard;
module.exports.widget = widget;