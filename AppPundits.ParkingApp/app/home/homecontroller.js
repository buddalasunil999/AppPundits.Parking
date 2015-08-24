(function () {
    'use strict';
    angular.module('app').controller('homecontroller', ['$scope', '$modal', 'common', function ($scope, $modal, common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('homecontroller');

        function activate() {
            var promises = [];
            common.activateController(promises, 'homecontroller');
        }

        //activate();
    }]);
})();