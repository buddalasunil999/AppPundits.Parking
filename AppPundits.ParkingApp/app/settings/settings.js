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
                        return 'add';
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                log('New car type added with id ' + $scope.selected.Id);
            });
        };

        $scope.removecartype = function (id) {
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
                datacontext.removecartype(id).then(function () {
                    //$dialogs.notify('Selected car type is removed.');
                    log('Selected car type is removed.');
                });
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