(function () {
    'use strict';
    angular.module('app').controller('manageparkingbuilding', ['$scope', '$modalInstance', 'common', 'datacontext', 'items', function ($scope, $modalInstance, common, datacontext, items) {

        activate();

        function activate() {
            var promises = [];
            common.activateController(promises, 'manageparkingbuilding');
        }

        if (items.length > 0) {
            $scope.building = items[0];
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
                $modalInstance.close(result.data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();