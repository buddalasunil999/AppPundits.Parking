(function () {
    'use strict';
    angular.module('app').controller('settings', ['$scope', '$modal', 'common', 'datacontext', function ($scope, $modal, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('settings');

        $scope.messageCount = 0;
        $scope.cartypes = [];
        $scope.title = 'Settings';

        activate();

        function activate() {
            var promises = [getMessageCount(), getCartypes()];
            common.activateController(promises, 'settings');
            //.then(function () { log('Cartypes are loaded'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return $scope.messageCount = data;
            });
        }

        function getCartypes() {
            return datacontext.getCartypes().then(function (data) {
                return $scope.cartypes = data;
            });
        }

        $scope.openaddcar = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/addcartype.html',
                controller: 'cartypecontroller',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.cartypes.push(selectedItem);
                log('New car type added');
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
                        return '';
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                datacontext.removecartype(cartype.Id).then(function () {
                    //$dialogs.notify('Selected car type is removed.');
                    $scope.cartypes.splice($scope.cartypes.indexOf(cartype), 1);
                    log('Selected car type is removed.');
                });
            });
        };
        
        $scope.editcartype = function (cartype) {
            //var item = jQuery.extend(true, {}, cartype);
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/addcartype.html',
                controller: 'cartypecontroller',
                resolve: {
                    items: function () {
                        return [cartype];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                log('Car type changes are saved');
            }, function () {
            });
        };        
    }]);

    angular.module('app').controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

        $scope.ok = function () {
            $modalInstance.close('ok');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

})();