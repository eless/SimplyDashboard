/**
 * Created by Eless on 20.07.2015.
 */
var dashboard = require('models/db').dashboard;
var widget = require('models/db').widget;
/*var dashboard = {
    elements: []
};*/


var dashboards = {
    getList: function(){
        return dashboard.getList();
    },
    getWidgets: function(dashboardId){
        return widget.getList(dashboardId);
    },
    addWidget: function(dashboardId, widget){
        widget.add(dashboardId, widget);
    },
    addDashboard: function(name){
        dashboard.add(name);
    },
    remove: function(id){
        dashboard.remove(id);
    },
    removeWidget: function(id){
        widget.remove(id);
    }
};


module.exports = dashboards;
