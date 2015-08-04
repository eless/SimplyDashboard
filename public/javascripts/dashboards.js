/**
 * Created by Eless on 21.07.2015.
 */
var dashCollection = angular.module('dashCollection', []);
var dashboardsCtrl = dashCollection.controller('dashboardsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('dashboards/dashboards.json').success(function (data) {
        if (data) {
            $scope.dashboards = data;
        }
    });

}]);
closeWidget = function(id){
    $("#"+id).hide(200);
    io.emit('removeWidget', id);
};
dashCollection.directive('ngTabs', function() {
    function addWidgets(tabId, widgets){
        $( "#tabs" ).tabs( "load", "#"+ tabId);
        var widgetsHtml = "";
        for(var i=0;i<widgets.length;i++){
            $("#" + widgets[i].id).remove();
            widgetsHtml +=
                "<div class='draggable' id='"+ widgets[i].id +"'>" +
                "<h1>"+ widgets[i].name +"<img src='images/delete-widget.png' class='close-widget-button' onclick='closeWidget(\"" + widgets[i].id + "\")'/></h1>";
            if(widgets[i].text && widgets[i].text != ''){
                if(widgets[i].link && widgets[i].link != '')
                    widgetsHtml += "<p><a href='"+ widgets[i].link +"'>" + widgets[i].text + "</a></p>";
                else
                    widgetsHtml += "<p>" + widgets[i].text + "</p>";
            }
            if(widgets[i].image){
                widgetsHtml += "<img src='data:image/png;base64," + widgets[i].image + "'/>"
            }
            widgetsHtml += "</div>";
        }
        $(widgetsHtml).appendTo( "#" + tabId );
        $( ".draggable").draggable({
            containment: '#tabs'
        }).resizable();
    }
    return function(scope, elm) {
        setTimeout(function() {
            $('#tabs').addClass( ".ui-tabs" ).tabs({
                spinner: 'Loading...',
                create: function( event, ui ) {
                    var tabId = ui.panel.attr("id");
                    if(tabId) {
                        $.get('dashboards/' + tabId, function(data) {
                            addWidgets(tabId, data);
                        })
                    }
                },
                activate: function(event, ui) {
                    var tabId = ui.newPanel.attr("id");
                    if(tabId) {
                        $.get('dashboards/' + tabId, function(data) {
                            addWidgets(tabId, data);
                        })
                    }
                }
            });
            $( ".new-widget-buttons" ).buttonset();

            $('.addTextWidget').click(function(e) {
                $('#add-new-text').dialog("open")
            });

            $('.addLinkWidget').click(function(e) {
                $('#add-new-link').dialog("open")
            });


            $('.addImgWidget').click(function(e) {
                $('#add-new-img').dialog("open");
                document.forms.upload.onsubmit = function() {
                    var input = this.elements.image;
                    var file = input.files[0];
                    if (file) {
                        upload(file);
                    }
                    return false;
                }
            });
        },300);
    };
});
;
function upload(file) {

    var xhr = new XMLHttpRequest();
    var log = function(msg){
        console.log(msg);
    };
    // обработчик для закачки
    xhr.upload.onprogress = function(event) {
        log(event.loaded + ' / ' + event.total);
    };

    // обработчики успеха и ошибки
    // если status == 200, то это успех, иначе ошибка
    xhr.onload = xhr.onerror = function() {
        if (this.status == 200) {
            log("success");
            $('#add-new-img').dialog("close");
        } else {
            alert("error " + this.status);
            //$('#add-new-img').dialog("close");
        }
    };


    xhr.open("POST", "upload", true);
    xhr.send(file);

}
function dashboardsEvents() {
    $('#add-new-text').dialog({
        buttons: [{text: "OK", click: function() {

            $('#add-new-text').dialog("close");
        }}],
        width: 740,
        height: 520,
        autoOpen: false,
        modal: true
    });
    $('#add-new-link').dialog({
        buttons: [{text: "OK", click: function() {

            $('#add-new-link').dialog("close");
        }}],
        width: 750,
        height: 570,
        autoOpen: false,
        modal: true
    });
    $('#add-new-img').dialog({
        width: 400,
        height: 170,
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
        io.on('newDashboard', function (msg) {
            var tabsElem = $('#tabs');
            tabsElem.tabs("refresh");
        });
        document.querySelector('#addDashboard').onclick = function () {
            var dashName = document.querySelector('#dashName').value;
            if (dashName != '') {
                io.emit('addNewDashboard', dashName);
            }
        };
        /*document.querySelector('#addWidget').onclick = function () {
         var tabsElem = $('#tabs');
         var tabIndex = tabsElem.tabs("option", "active");
         var dash = tabsElem.find('li:eq(' + tabIndex + ')');
         var widget = {};
         if (widget) {
         io.emit('addNewWidget', [dash.id, widget]);
         }
         };*/
        document.querySelector('#removeDash').onclick = function () {
            var tabsElem = $('#tabs');
            var tabIndex = tabsElem.tabs("option", "active");
            if(!tabIndex) tabIndex = 0; // for 0-tab
            var elem = tabsElem.find('li:eq(' + tabIndex + ')');
            //remove active tab
            io.emit('removeDashboard',/* elem.id*/ elem.attr("aria-controls"));
            elem.css('display','none');
            tabsElem.tabs("refresh");
        };
    });
    $(".markItUp").markItUp(mySettings);
}
