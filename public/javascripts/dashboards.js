/**
 * Created by Eless on 21.07.2015.
 */
var dashCollection = angular.module('dashCollection', []);
dashCollection.controller('dashboardsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('dashboards/dashboards.json').success(function (data) {
        if (data) {
            $scope.dashboards = data;
        }
    })
}]);
dashCollection.directive('ngTabs', function() {
    return function(scope, elm) {
        setTimeout(function() {
            $('#tabs').addClass( ".ui-tabs" ).tabs();
            $( ".draggable" ).draggable({
                    containment: '#tabs'
            }).resizable({
            });
            $( ".new-widget-buttons" ).buttonset();


            $('.addTextWidget').click(function(e) {
                $('#add-new-text').dialog("open")
            });

            $('.addLinkWidget').click(function(e) {
                $('#add-new-link').dialog("open")
            });


            $('.addImgWidget').click(function(e) {
                $('#add-new-img').dialog("open")
            });

        },300);
    };
});
function closeWidget(id){
    $("#"+id).hide(200);
    io.emit('removeWidget', id);
}
function dashboardsEvents() {
    $('#add-new-text').dialog({
        buttons: [{text: "OK", click: function() {
            $('#add-new-text').dialog("close");
        }}],
        autoOpen: false,
        modal: true
    });
    $('#add-new-link').dialog({
        buttons: [{text: "OK", click: function() {
            $('#add-new-link').dialog("close");
        }}],
        autoOpen: false,
        modal: true
    });
    $('#add-new-img').dialog({
        buttons: [{text: "OK", click: function() {
            $('#add-new-img').dialog("close");
        }}],
        autoOpen: false,
        modal: true
    });
    io.on('connect', function () {
        io.on('newDashboard', function (msg) {
            var tabsElem = $('#tabs');
            /*var name = document.querySelector('#dashName').value;
            // Добавляем вкладку
            $( "<li><a href='#" + msg.id + "'>" + name +"</a></li>" )
                .appendTo( "#tabs .ui-tabs-nav" );
*/
            tabsElem.tabs("refresh");
        });
        io.on('newWidget', function (msg) {
            var tabsElem = $('#tabs');
            var name = document.querySelector('#dashName').value;
            tabsElem.tabs("refresh");
        });
        document.querySelector('#addDashboard').onclick = function () {
            var dashName = document.querySelector('#dashName').value;
            if (dashName != '') {
                io.emit('addNewDashboard', dashName);
            }
        };
        document.querySelector('#addWidget').onclick = function () {
            var tabsElem = $('#tabs');
            var tabIndex = tabsElem.tabs("option", "active");
            var dash = tabsElem.find('li:eq(' + tabIndex + ')');
            var widget = {};
            if (widget) {
                io.emit('addNewWidget', [dash.id, widget]);
            }
        };
        document.querySelector('#removeDash').onclick = function () {
            var tabsElem = $('#tabs');
            var tabIndex = tabsElem.tabs("option", "active");
            var elem = tabsElem.find('li:eq(' + tabIndex + ')');
            io.emit('removeDashboard', elem.id);
            //удаляем активную вкладку
            //elem.css('display','none');
            tabsElem.tabs("refresh");
        };

    })
}
