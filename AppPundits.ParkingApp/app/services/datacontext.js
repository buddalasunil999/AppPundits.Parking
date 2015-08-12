(function () {
    'use strict';

    angular.module('app').factory('datacontext', ['common', '$window', '$http', function (common, $window, $http) {
        var $q = common.$q;

        var service = {
            getInfringements: function () {
                return $http.get('http://localhost:2239/api/infringements').then(function (response) {
                    return response.data;
                });
                return $q.when(infringements);
            },
            getCartypes: function () {
                return $http.get('http://localhost:2239/api/cartypes').then(function (response) {
                    return response.data;
                });
            },
            saveCartype: function (cartype) {
                var message;
                $http.post('http://localhost:2239/api/cartypes', cartype).then(function (response) {
                    message = "Success";
                }, function (response) {
                    message = "Failed";
                });

                return $q.when(message);
            },
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }


    }]);

})();