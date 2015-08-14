(function () {
    'use strict';
    angular.module('app').controller('parkingbuildings', ['$scope', '$modal', 'common', 'datacontext', function ($scope, $modal, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('parkingbuildings');

        $scope.buildings = [];

        activate();

        function activate() {
            var promises = [getbuildings()];
            common.activateController(promises, 'parkingbuildings');
        }

        function getbuildings() {
            return datacontext.getParkingBuildings().then(function (data) {
                return $scope.buildings = data;
            });
        }

        $scope.add = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/manageparkingbuilding.html',
                controller: 'manageparkingbuilding',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.buildings.push(selectedItem);
                log('New parking building added');
            }, function () {
            });
        };

        $scope.remove = function (building) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return ['Are you sure?', 'Do you want to delete the building?'];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                datacontext.removeParkingBuilding(building.Id).then(function () {
                    $scope.buildings.splice($scope.buildings.indexOf(building), 1);
                    log('Selected building is removed.');
                });
            });
        };

        $scope.edit = function (building) {
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/manageparkingbuilding.html',
                controller: 'manageparkingbuilding',
                resolve: {
                    items: function () {
                        return [building];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                log('Building changes are saved');
            }, function () {
            });
        };
    }]);

})();