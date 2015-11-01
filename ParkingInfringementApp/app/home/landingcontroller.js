(function () {
    'use strict';
    angular.module('app').controller('landingcontroller', ['$scope', '$modal', '$location', 'common', function ($scope, $modal, $location, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('landingcontroller');

        function activate() {
            var promises = [];
            common.activateController(promises, 'landingcontroller');
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
                $location.path('/home');
            }, function () {
            });
        };

        activate();
    }]);

    angular.module('app').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

        $scope.ok = function () {
            $modalInstance.close('ok');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
})();