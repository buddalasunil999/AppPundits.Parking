(function () {
    'use strict';
    angular.module('app').controller('topnavcontroller', ['$rootScope', 'AUTH_EVENTS', '$modal', '$location', 'AuthenticationService', function ($rootScope, AUTH_EVENTS, $modal, $location, AuthenticationService) {
        var vm = this;

        vm.isLoggedIn = $rootScope.globals.isLoggedIn;
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () { vm.isLoggedIn = true; });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () { vm.isLoggedIn = false; });

        vm.showlogin = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/login/login.view.html',
                controller: 'LoginController as vm',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                //log('You are logged in');
                $location.path('/dashboard');
            }, function () {
            });
        };
        vm.logout = function () {
            AuthenticationService.ClearCredentials();
        };
    }]);
})();