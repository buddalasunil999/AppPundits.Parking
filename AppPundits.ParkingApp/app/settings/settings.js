(function () {
    'use strict';
    angular.module('app').controller('settings', ['$scope', 'common', 'datacontext', function ($scope, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('settings');

        $scope.messageCount = 0;
        $scope.cartypes = [];
        $scope.title = 'Settings';

        activate();

        function activate() {
            var promises = [getMessageCount(), getCartypes()];
            common.activateController(promises, 'settings');
            //.then(function () { log('Cartypes are loaded'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return $scope.messageCount = data;
            });
        }

        function getCartypes() {
            return datacontext.getCartypes().then(function (data) {
                return $scope.cartypes = data;
            });
        }

        $scope.savecartype = function savecartype() {
            var cartype = {
                'Make': carmake,
                'Model': carmodel
            };
            datacontext.saveCartype(cartype).then(function () { });
        }
    }]);

})();