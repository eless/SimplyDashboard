/**
 * Created by Eless on 20.07.2015.
 */
var dashboard = require('models/db').dashboard;
var widget = require('models/db').widget;
/*var dashboard = {
    elements: []
};*/


var dashboards = {
    getList: function(callback, scope){
        var scope = scope || this;
        dashboard.getList(callback, scope);
    },
    getWidgets: function(dashboardId){
        widget.getList(dashboardId, function(result){
            return result;
        });
    },
    addWidget: function(dashboardId, widget){
        widget.add(dashboardId, widget);
    },
    addDashboard: function(name, callback){
        dashboard.add(name, callback);
    },
    remove: function(id){
        if(id){
            dashboard.remove(id);
        }
    },
    removeWidget: function(id){
        widget.remove(id);
    }
};


module.exports = dashboards;
