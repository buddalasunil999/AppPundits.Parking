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

        if (items.length > 0) {
            $scope.cartype = items[0];
            $scope.dialogtitle = 'Edit Car Type';
        }
        else {
            $scope.cartype = {
                'Id': 0,
                'Make': '',
                'Model': ''
            };
            $scope.dialogtitle = 'Add Car Type';
        }

        $scope.savecartype = function () {
            datacontext.saveCartype($scope.cartype).then(function (result) {
                $modalInstance.close(result.data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();