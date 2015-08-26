(function () {
    'use strict';
    angular.module('app').controller('manageuser', ['$modalInstance', 'datacontext', 'items', function ($modalInstance, datacontext, items) {

        var vm = this;

        var isedit = items.length > 0;

        if (isedit) {
            vm.user = angular.copy(items[0]);
            vm.dialogtitle = 'Edit User';
        }
        else {
            vm.user = {
                'Id': 0,
                'UserName': '',
                'Email': '',
                'PhoneNumber': '',
                'Locked': ''
            };
            vm.dialogtitle = 'Add User';
        }

        vm.save = function () {
            datacontext.saveUser(vm.user).then(function (result) {
                if (isedit)
                    $modalInstance.close(vm.user);
                else
                    $modalInstance.close(result.data);
            });
        }

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();