(function () {
    'use strict';
    angular.module('app').controller('manageparkingbuilding', ['$scope', '$modalInstance', 'datacontext', 'items', function ($scope, $modalInstance, datacontext, items) {

        var isedit = items.length > 0;

        if (isedit) {
            $scope.building = angular.copy(items[0]);
            $scope.dialogtitle = 'Edit Parking Building';
        }
        else {
            $scope.building = {
                'Id': 0,
                'BuildingName': '',
                'StreetName': '',
                'City': ''
            };
            $scope.dialogtitle = 'Add Parking Building';
        }

        $scope.save = function () {
            datacontext.saveParkingBuilding($scope.building).then(function (result) {
                if (isedit)
                    $modalInstance.close($scope.building);
                else
                    $modalInstance.close(result.data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();