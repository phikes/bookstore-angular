'use strict'

angular.module('bookstoreAngularApp', [
  'ngAnimate'
  'ngCookies'
  'ngResource'
  'ngRoute'
  'ngSanitize'
  'ngTouch'
  'ui.router', 'ui.bootstrap'
  'bookstoreAngularApp.controllers', 'bookstoreAngularApp.directives', 'bookstoreAngularApp.services'
]).config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.state 'books',
    url: '/'
    templateUrl: 'views/books/index.html'
    controller: 'BooksController'

  $urlRouterProvider.otherwise '/'
  return
