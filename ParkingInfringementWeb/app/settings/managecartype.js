(function () {
    'use strict';
    angular.module('app').controller('cartypecontroller', ['$scope', '$modalInstance', 'datacontext', 'items', function ($scope, $modalInstance, datacontext, items) {

        var isedit = items.length > 0;
        
        if (isedit) {
            $scope.cartype = angular.copy(items[0]);
            $scope.dialogtitle = 'Edit Car Type';
        }
        else {
            $scope.cartype = {
                'Id': 0,
                'Make': ''
            };
            $scope.dialogtitle = 'Add Car Type';
        }

        $scope.savecartype = function () {
            datacontext.saveCartype($scope.cartype).then(function (result) {
                if (isedit)
                    $modalInstance.close($scope.cartype);
                else
                    $modalInstance.close(result.data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();