'use strict';

/**
 * @ngdoc overview
 * @name friendtoneApp
 * @description
 * # friendtoneApp
 *
 * Main module of the application.
 */
angular
    .module('friendtoneApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.router',
        'bd.sockjs'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $sceProvider /* dont disable sce, it's stupid*/) {
        $sceProvider.enabled(false);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'RecordRTC'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            });
    });
