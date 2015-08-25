(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['$modal', 'datacontext', admin]);

    function admin($modal, datacontext) {
        
        var vm = this;
        vm.title = 'Admin';
        vm.users = [];

        function activate() {
            getusers();
        }

        function getusers() {
            return datacontext.getUsers().then(function (data) {
                return vm.users = data;
            });
        }

        vm.add = function () {
            var modalInstance = $modal.open({
                templateUrl: '/app/admin/manageuser.html',
                controller: 'manageuser as vm',
                resolve: {
                    items: function () {
                        return [];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.users.push(selectedItem);
                //log('New user added');
            }, function () {
            });
        };

        vm.edit = function (user) {
            var modalInstance = $modal.open({
                templateUrl: '/app/settings/manageuser.html',
                controller: 'manageuser as vm',
                resolve: {
                    items: function () {
                        return [user];
                    }
                }
            });

            modalInstance.result.then(function (result) {
                vm.users[vm.users.indexOf(user)] = angular.copy(result);
                //log('User changes are saved');
            }, function () {
            });
        };

        vm.remove = function (user) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return ['Are you sure?', 'Do you want to delete the user?'];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                datacontext.removeUser(user.Id).then(function () {
                    vm.users.splice(vm.users.indexOf(user), 1);
                    //log('Selected user is removed.');
                });
            });
        };

        activate();
    };
})();