(function () {
    'use strict';
    angular.module('app').controller('cartypes', ['$scope', '$modal', 'datacontext', function ($scope, $modal, datacontext) {
        
        $scope.messageCount = 0;
        $scope.cartypes = [];

        activate();

        function activate() {
            getCartypes();
        }

        function getCartypes() {
            return datacontext.getCartypes().then(function (data) {
                return $scope.cartypes = data;
            });
        }

        $scope.openaddcar = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/managecartype.html',
                controller: 'cartypecontroller',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.cartypes.push(selectedItem);
                //log('New car type added');
            }, function () {
            });
        };

        $scope.removecartype = function (cartype) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return ['Are you sure?', 'Do you want to delete the car type?'];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                datacontext.removecartype(cartype.Id).then(function () {
                    //$dialogs.notify('Selected car type is removed.');
                    $scope.cartypes.splice($scope.cartypes.indexOf(cartype), 1);
                    //log('Selected car type is removed.');
                });
            });
        };

        $scope.editcartype = function (cartype) {
            //var item = jQuery.extend(true, {}, cartype);
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/managecartype.html',
                controller: 'cartypecontroller',
                resolve: {
                    items: function () {
                        return [cartype];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                $scope.cartypes[$scope.cartypes.indexOf(cartype)] = angular.copy(result);
                //log('Car type changes are saved');
            }, function () {
            });
        };
    }]);

})();