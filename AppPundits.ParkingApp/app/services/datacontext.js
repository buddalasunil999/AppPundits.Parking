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
                var result = {
                    message: '',
                    data: cartype
                };
                if (cartype.Id == '') {
                    $http.post('http://localhost:2239/api/cartypes', cartype).then(function (response) {
                        result.data.Id = response.data.Id;
                        result.message = 'success';
                    }, function (response) {
                        result.message = 'failed';
                    });
                }
                else {
                    $http.put('http://localhost:2239/api/cartypes/' + cartype.Id, cartype).then(function (response) {
                        result.message = 'success';
                    }, function (response) {
                        result.message = 'failed';
                    });
                }

                return $q.when(result);
            },
            removecartype: function (id) {
                return $http.delete('http://localhost:2239/api/cartypes/' + id).then(function (response) {
                    return response;
                });
            },
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }


    }]);

})();