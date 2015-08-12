(function () {
    'use strict';

    angular.module('app').factory('datacontext', ['common', '$http', function (common, $http) {
        var $q = common.$q;

        var service = {
            getInfringements: function getInfringements() {
                var infringements = [];
                $http.get('http://localhost:2239/api/infringements').success(function (data) {
                    infringements = [
                        { BreachNo: "15594415180515", CarRegNo: 'AAA1234', CarType: 'Papa', CustomerId: 25, OffenseAmount: '20', ParkingBuildingId: '', TransactionId: '', BreachDate: '', Comments: '', OffenseId: '' },
                        { BreachNo: "15594415180515", CarRegNo: 'AAA1234', CarType: 'Papa', CustomerId: 25, OffenseAmount: '20', ParkingBuildingId: '', TransactionId: '', BreachDate: '', Comments: '', OffenseId: '' },
                        { BreachNo: "15594415180515", CarRegNo: 'AAA1234', CarType: 'Papa', CustomerId: 25, OffenseAmount: '20', ParkingBuildingId: '', TransactionId: '', BreachDate: '', Comments: '', OffenseId: '' }
                    ];
                });
                return $q.when(infringements);
            },
            getCartypes: function getCartypes() {
                var cartypes = [];
                $http.get('http://localhost:2239/api/cartypes').success(function (data) {
                    cartypes = [
                        { Id: "1", Make: 'AAA1234', Model: 'Papa' },
                        { Id: "2", Make: 'AAA1234', Model: 'Papa' },
                        { Id: "3", Make: 'AAA1234', Model: 'Papa' }
                    ];
                });
                return $q.when(cartypes);
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