(function () {
    'use strict';
    angular.module('app').controller('topnavcontroller', ['$modal', '$location', function ($modal, $location) {
        var vm = this;
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
    }]);
})();