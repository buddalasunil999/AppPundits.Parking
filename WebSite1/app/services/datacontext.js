(function () {
    'use strict';

    angular.module('app').factory('datacontext', ['$window', '$http', function ($window, $http) {
        var $q = $q;
        var host = 'http://localhost:2239/api';

        var service = {
            getInfringements: function () {
                return $http.get(host + '/infringements').then(function (response) {
                    return response.data;
                });
            },
            saveInfringement: function (infringement) {
                if (infringement.Id == '') {
                    return $http.post(host + '/infringements', infringement);
                }
                else {
                    return $http.put(host + '/infringements/' + infringement.Id, infringement);
                }
            },
            removeInfringement: function (id) {
                return $http.delete(host + '/infringements/' + id).then(function (response) {
                    return response;
                });
            },
            getCartypes: function () {
                return $http.get(host + '/cartypes').then(function (response) {
                    return response.data;
                });
            },
            saveCartype: function (cartype) {
                if (cartype.Id == '') {
                    return $http.post(host + '/cartypes', cartype);
                }
                else {
                    return $http.put(host + '/cartypes/' + cartype.Id, cartype);
                }
            },
            removecartype: function (id) {
                return $http.delete(host + '/cartypes/' + id).then(function (response) {
                    return response;
                });
            },
            getMessageCount: getMessageCount,
            getParkingBuildings: getParkingBuildings,
            saveParkingBuilding: saveParkingBuilding,
            removeParkingBuilding: removeParkingBuilding,
            getNewInfringement: getNewInfringement,
            getOffenses: getOffenses,
            saveOffense: saveOffense,
            removeOffense: removeOffense
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getParkingBuildings() {
            return $http.get(host + '/parkingbuildings').then(function (response) {
                return response.data;
            });
        }

        function removeParkingBuilding(id) {
            return $http.delete(host + '/parkingbuildings/' + id).then(function (response) {
                return response;
            });
        }

        function saveParkingBuilding(building) {
            if (building.Id == '') {
                return $http.post(host + '/parkingbuildings', building);
            }
            else {
                return $http.put(host + '/parkingbuildings/' + building.Id, building);
            }
        }

        function getNewInfringement() {
            return $http.get(host + '/infringements?isnew=true').then(function (response) {
                return response.data;
            });
        }
        
        function getOffenses() {
            return $http.get(host + '/offenses').then(function (response) {
                return response.data;
            });
        }

        function saveOffense(offense) {
            if (offense.Id == '') {
                return $http.post(host + '/offenses', offense);
            }
            else {
                return $http.put(host + '/offenses/' + offense.Id, offense);
            }
        }

        function removeOffense(id) {
            return $http.delete(host + '/offenses/' + id).then(function (response) {
                return response;
            });
        }
    }]);

})();