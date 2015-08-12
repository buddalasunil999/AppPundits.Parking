(function () {
    'use strict';
    angular.module('app').controller('cartypecontroller', ['$scope', '$modalInstance', 'common', 'datacontext', 'items', function ($scope, $modalInstance, common, datacontext, items) {

        $scope.title = 'cartypecontroller';

        activate();

        function activate() {
            var promises = [];
            common.activateController(promises, 'cartypecontroller');
            //.then(function () { log('Cartypes are loaded'); });
        }
        $scope.cartype = {
            'Make': '',
            'Model': ''
        };

        $scope.savecartype = function () {
            datacontext.saveCartype($scope.cartype).then(function (data) {
                $modalInstance.close(data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();