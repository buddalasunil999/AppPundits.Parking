(function () {
    'use strict';
    angular.module('app').controller('infringementcontroller', ['$scope', '$modalInstance', 'datacontext', 'items', function ($scope, $modalInstance, datacontext, items) {
        
        var isedit = items.length > 0;

        function activate() {
            getCartypes();
            getParkingBuildings();
            getOffenses();
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

        function getOffenses() {
            return datacontext.getOffenses().then(function (data) {
                return $scope.offenses = data;
            });
        }

        function getNewInfringement() {
            return datacontext.getNewInfringement().then(function (data) {
                return $scope.infringement = data;
            });
        }

        $scope.assignOffenseAmount = function (offense) {
            $scope.infringement.OffenseAmount = $scope.infringement.Offense.FineAmount;
        }

        $scope.saveinfringement = function () {
            datacontext.saveInfringement($scope.infringement).then(function (result) {
                if (isedit)
                    $modalInstance.close($scope.infringement);
                else
                    $modalInstance.close(result.data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        if (isedit) {
            $scope.infringement = angular.copy(items[0]);
            $scope.dialogtitle = 'Edit Infringement';
        }
        else {
            promises.push(getNewInfringement());
            $scope.dialogtitle = 'Add Infringement';
        }

        activate();
    }]);
})();