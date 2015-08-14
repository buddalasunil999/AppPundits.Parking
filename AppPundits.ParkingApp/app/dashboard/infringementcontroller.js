(function () {
    'use strict';
    angular.module('app').controller('infringementcontroller', ['$scope', '$modalInstance', 'common', 'datacontext', 'items', function ($scope, $modalInstance, common, datacontext, items) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('infringementcontroller');
        var promises = [];


        function activate() {
            promises.push(getCartypes());
            promises.push(getParkingBuildings());
            common.activateController(promises, 'infringementcontroller');
        }

        function getCartypes() {
            return datacontext.getCartypes().then(function (data) {
                return $scope.cartypes = data;
            });
        }

        function getParkingBuildings() {
            return datacontext.getParkingBuildings().then(function (data) {
                return $scope.parkingbuildings = data;
            });
        }

        function getNewInfringement() {
            return datacontext.getNewInfringement().then(function (data) {
                return $scope.infringement = data;
            });
        }

        if (items.length > 0) {
            $scope.infringement = items[0];
            $scope.dialogtitle = 'Edit Infringement';
        }
        else {
            promises.push(getNewInfringement());
            //$scope.infringement = {
            //    'Id': 0,
            //    'CarRegNo': '',
            //    'CarMake': '',
            //    'CarModel': '',
            //    'BreachNo': '',
            //    'ParkingBuildingId': 0
            //};
            $scope.dialogtitle = 'Add Infringement';
        }

        $scope.saveinfringement = function () {
            datacontext.saveInfringement($scope.infringement).then(function (result) {
                $modalInstance.close(result.data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        activate();
    }]);
})();