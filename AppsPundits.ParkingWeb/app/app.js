(function () {
    'use strict';

    angular.module('app', ['ngRoute',
        'ngCookies',
        'ui.bootstrap',
        'datatables',
        'datatables.bootstrap'])
        .config(config)
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'homecontroller',
                templateUrl: 'app/home/home.html',
                controllerAs: 'vm'
            })
            .when('/', {
                controller: 'dashboard',
                templateUrl: 'app/dashboard/dashboard.html'
            })
            .when('/admin', {
                controller: 'admin',
                controllerAs: 'vm',
                templateUrl: 'app/admin/admin.html'
            })
            .when('/settings', {
                controller: 'settings',
                templateUrl: 'app/settings/settings.html'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'app/register/register.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/home' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'AUTH_EVENTS'];
    function run($rootScope, $location, $cookieStore, $http, AUTH_EVENTS) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $rootScope.globals.isLoggedIn = true;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        else
            $rootScope.globals.isLoggedIn = false;

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log($location.path());
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/home', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/home');
            }
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
            $location.path('/home');
        });
    }

})();