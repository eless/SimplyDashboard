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
            elm.tabs();
        },0);
    };
});/*
function dashboardsCtrl($scope, $http) {
    $http.get('dashboards/dashboards.json').success(function (data) {
        if (data) {
            $scope.dashboards = data;
        }
    })
}*/
