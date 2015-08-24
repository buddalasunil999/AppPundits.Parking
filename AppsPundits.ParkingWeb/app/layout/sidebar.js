(function () {
    'use strict';

    var controllerId = 'sidebar';
    angular.module('app').controller(controllerId,
        ['$route', '$rootScope', 'AUTH_EVENTS', sidebar]);

    function sidebar($route, $rootScope, AUTH_EVENTS) {
        var vm = this;
        var routes = getRoutes();
        vm.isCurrent = isCurrent;
        vm.isLoggedIn = $rootScope.globals.isLoggedIn;

        activate();
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () { vm.isLoggedIn = true; });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () { vm.isLoggedIn = false; });

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = routes;
        }

        function isCurrent(route) {
            if ($route.current && $route.current.loadedTemplateUrl) {
                return $route.current.loadedTemplateUrl.indexOf(route) > -1 ? 'current' : '';
            }
            else if (route === 'dashboard')
                return true;
            return false;
        }
    };

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/dashboard',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }, {
                url: '/settings',
                config: {
                    title: 'settings',
                    templateUrl: 'app/settings/settings.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-cog"></i> Settings'
                    },
                    anotherlevel: {
                        url: '/settings/cartypes',
                        config: {
                            title: 'settings',
                            templateUrl: 'app/settings/settings.html',
                            settings: {
                                nav: 1,
                                content: '<i class="fa fa-cog"></i> Settings'
                            }
                        }
                    }
                }
            }
        ];
    }
})();
