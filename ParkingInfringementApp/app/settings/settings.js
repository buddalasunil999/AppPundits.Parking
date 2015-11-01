(function () {
    'use strict';
    angular.module('app').controller('settings', ['$scope', '$modal', 'common', 'datacontext', function ($scope, $modal, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('settings');             
    }]);

    angular.module('app').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

        $scope.title = items[0];
        $scope.message = items[1];

        $scope.ok = function () {
            $modalInstance.close('ok');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

})();