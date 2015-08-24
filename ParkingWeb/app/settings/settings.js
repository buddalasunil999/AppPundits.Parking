(function () {
    'use strict';
    angular.module('app').controller('settings', ['$scope', '$modal', 'datacontext', function ($scope, $modal, datacontext) {
       
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