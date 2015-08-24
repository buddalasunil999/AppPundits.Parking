(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, [admin]);

    function admin() {
        
        var vm = this;
        vm.title = 'Admin';
    }
})();