(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', ['$scope', '$location', '$modalInstance', 'AuthenticationService', 'FlashService', 'common', function ($scope, $location, $modalInstance, AuthenticationService, FlashService, common) {
            var getLogFn = common.logger.getLogFn;
            var log = getLogFn('LoginController');

            $scope.username = '';
            $scope.password = '';

            (function activate() {
                var promises = [];
                common.activateController(promises, 'LoginController');
            })();

            (function initController() {
                // reset login status
                AuthenticationService.ClearCredentials();
            })();

            $scope.login = function () {
                $scope.dataLoading = true;
                log($scope.username);
                AuthenticationService.Login($scope.username, $scope.password, function (response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password);
                        $modalInstance.close(true);
                    } else {
                        log(response.message);
                        FlashService.Error(response.message);
                        $scope.dataLoading = false;
                    }
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }])
})();
