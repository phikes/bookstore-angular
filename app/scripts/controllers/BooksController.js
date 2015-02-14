'use strict';

var app = angular.module('bookstoreAngularApp.controllers', []);

app.controller('BooksController', function($scope, $state, $stateParams, Book) {
  $scope.active = 0;
  $scope.books = [];

  Book.query().then(function (results) {
    $scope.books = results;
    $scope.active = $scope.books[0].id;
  }, function () {
    console.log('Bücher konnten nicht geladen werden...');
  });

  $scope.setActive = function(newActive) {
    $scope.active = newActive;
  };
  $scope.isActive = function(check) {
    return $scope.active === check;
  };
});

app.controller('BooksIndexController', function($scope, $state, $stateParams, flash, Book) {
  $scope.flash = flash;
  $scope.hover = false;
  $scope.newBook = {};

  $scope.createBook = function() {
    $('.has-error').removeClass('has-error');
    $('.help-block').remove();

    console.log($scope.newBook);

    new Book($scope.newBook).create().then(function(result) {
      console.log(result);
      flash.setMessage('Buch wurde hinzugefügt!');
      $scope.newBook = {};
      $state.go($state.current, {}, {reload: true});
    }, function() {
      console.log('Bugs all over the place');
    });
  };
});

app.controller('FlashController', function($scope, $state, $stateParams, flash) {
  $scope.flash = flash;
});
