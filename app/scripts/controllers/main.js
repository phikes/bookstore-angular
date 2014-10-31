'use strict';

/**
 * @ngdoc function
 * @name bookstoreAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookstoreAngularApp
 */
angular.module('bookstoreAngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
