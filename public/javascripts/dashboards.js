/**
 * Created by Eless on 21.07.2015.
 */
angular.module('dashCollection', [])
    .controller('dashboardsCtrl', function ($scope, $http) {
        $http.get('dashboards/dashboards.json').success(function (data) {
            if (data) {
                $scope.dashboards = data;
            }
        })
    })
    /*.controller('widgetsCtrl',function($scope, $params, $http){
        $http.get('dashboards/' + $params.id).success(function(data){
            if(data){
                $scope.widgets = data;
            }
        })
    })*/;