(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', ['$location', '$modalInstance', 'AuthenticationService', 'FlashService', LoginController]);

    function LoginController($location, $modalInstance, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $modalInstance.close(true);
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
