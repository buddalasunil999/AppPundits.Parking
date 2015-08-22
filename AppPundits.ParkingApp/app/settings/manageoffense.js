(function () {
    'use strict';
    angular.module('app').controller('manageoffense', ['$scope', '$modalInstance', 'common', 'datacontext', 'items', function ($scope, $modalInstance, common, datacontext, items) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn('manageoffense');
        activate();
        var isedit = items.length > 0;

        function activate() {
            var promises = [];
            common.activateController(promises, 'manageoffense');
        }

        if (isedit) {
            $scope.offense = angular.copy(items[0]);
            $scope.dialogtitle = 'Edit Offense';
        }
        else {
            $scope.offense = {
                'Id': 0,
                'Description': '',
                'FineAmount': ''
            };
            $scope.dialogtitle = 'Add Offense';
        }

        $scope.save = function () {
            datacontext.saveOffense($scope.offense).then(function (result) {
                if (isedit)
                    $modalInstance.close($scope.offense);
                else
                    $modalInstance.close(result.data);
            });
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();