(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['$scope', '$modal', 'common', 'datacontext', function ($scope, $modal, common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        $scope.infringements = [];
        $scope.title = 'Dashboard';

        function activate() {
            var promises = [getInfringements()];
            common.activateController(promises, controllerId);
            //.then(function () { log('Activated Dashboard View'); });
        }

        function getInfringements() {
            return datacontext.getInfringements().then(function (data) {
                return $scope.infringements = data;
            });
        }

        $scope.addinfringement = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/dashboard/manageinfringement.html',
                controller: 'infringementcontroller',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.infringements.push(selectedItem);
                log('New infringement created');
            }, function () {
            });
        };

        $scope.remove = function (infringement) {
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
                datacontext.removeInfringement(infringement.Id).then(function () {
                    $scope.infringements.splice($scope.infringements.indexOf(infringement), 1);
                    log('Selected infringement is removed.');
                });
            });
        };

        $scope.editinfringement = function (infringement) {
            //var item = jQuery.extend(true, {}, infringement);
            var modalInstance = $modal.open({
                templateUrl: '/app/dashboard/manageinfringement.html',
                controller: 'infringementcontroller',
                resolve: {
                    items: function () {
                        return [infringement];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                $scope.infringements[$scope.infringements.indexOf(infringement)] = angular.copy(result);
                log('Infringement changes are saved');
            }, function () {
            });
        };

        activate();
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