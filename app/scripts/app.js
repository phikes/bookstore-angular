'use strict';

angular
  .module('bookstoreAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'BookstoreCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
