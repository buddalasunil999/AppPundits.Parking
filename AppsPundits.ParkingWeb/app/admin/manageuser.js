(function () {
    'use strict';
    angular.module('app').controller('manageuser', ['$modalInstance', '$location', 'UserService', 'datacontext', 'items', 
        function ($modalInstance, $location, UserService, datacontext, items) {

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
                'Locked': '',
                'Role': ''
            };
            vm.dialogtitle = 'Add User';
        }

        vm.save = function () {
            vm.dataLoading = true;
            vm.user.ConfirmPassword = vm.user.Password;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        if (isedit)
                            $modalInstance.close(vm.user);
                        else {
                            var resetobj = {
                                'User': user,
                                'Url': $location.protocol() + '//' + $location.host() + ':' + $location.port() + '/' + 'forgotpassword'
                            };
                            UserService.SendPasswordEmail(resetobj);
                            $modalInstance.close(result.data);
                        }
                    } else {
                        vm.error = response.message;
                        vm.dataLoading = false;
                    }
                });

            //datacontext.saveUser(vm.user).then(function (result) {
            //    if (isedit)
            //        $modalInstance.close(vm.user);
            //    else
            //        $modalInstance.close(result.data);
            //});
        }

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
})();