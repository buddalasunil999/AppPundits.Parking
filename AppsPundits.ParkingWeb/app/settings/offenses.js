(function () {
    'use strict';
    angular.module('app').controller('offenses', ['$scope', '$modal', 'datacontext', function ($scope, $modal, datacontext) {
        
        $scope.offenses = [];

        activate();

        function activate() {
            getoffenses();
        }

        function getoffenses() {
            return datacontext.getOffenses().then(function (data) {
                return $scope.offenses = data;
            });
        }

        $scope.add = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/manageoffense.html',
                controller: 'manageoffense',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.offenses.push(selectedItem);
                //log('New offense added');
            }, function () {
            });
        };

        $scope.remove = function (offense) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return ['Are you sure?', 'Do you want to delete the offense?'];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                datacontext.removeOffense(offense.Id).then(function () {
                    $scope.offenses.splice($scope.offenses.indexOf(offense), 1);
                    //log('Selected offense is removed.');
                });
            });
        };

        $scope.edit = function (offense) {
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/manageoffense.html',
                controller: 'manageoffense',
                resolve: {
                    items: function () {
                        return [offense];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                $scope.offenses[$scope.offenses.indexOf(offense)] = angular.copy(result);
                //log('Offense changes are saved');
            }, function () {
            });
        };
    }]);

})();