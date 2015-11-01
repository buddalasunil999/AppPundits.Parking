(function () {
    'use strict';
    angular.module('app').controller('topnavcontroller', ['$scope', '$modal', '$location', 'common', function ($scope, $modal, $location, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('topnavcontroller');

        function activate() {
            var promises = [];
            common.activateController(promises, 'topnavcontroller');
        }

        $scope.showlogin = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/login/login.html',
                controller: 'LoginController',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                log('You are logged in');
                $location.path('/dashboard');
            }, function () {
            });
        };

        activate();
    }]);
})();