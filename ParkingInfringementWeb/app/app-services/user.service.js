(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'datacontext', 'config', '$window'];
    function UserService($http, datacontext, config, $window) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(config.apiurl + '/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(config.apiurl + '/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get(config.apiurl + '/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post(config.apiurl + '/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function SendPasswordEmail(resetobj) {
            return $http.post(config.apiurl + '/users/sendpasswordemail', resetobj).then(handleSuccess, handleError('Error sending email to user'));
        }

        function Update(user) {
            return $http.put(config.apiurl + '/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(config.apiurl + '/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
