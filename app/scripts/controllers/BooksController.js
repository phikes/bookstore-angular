'use strict';

var app = angular.module('bookstoreAngularApp.controllers', []);

app.controller('BooksController', function($scope, $state, $stateParams, flash, Book) {
  $scope.flash = flash;
  $scope.active = 0;
  $scope.books = [];

  Book.query().then(function (results) {
    $scope.books = results;
    $scope.active = $scope.books[0].id;
  }, function () {
    console.log('Get Error');
  });

  $scope.setActive = function(newActive) {
    $scope.active = newActive;
  };
  $scope.isActive = function(check) {
    return $scope.active === check;
  };

  $scope.deleteBook = function(book) {
    book.delete().then(function() {
      flash.setMessage('Buch wurde entfernt!');
      $state.go($state.current, {}, {reload: true});
    });
  };
});

app.controller('BooksIndexController', function($scope, $state, $stateParams, flash, Book) {
  $scope.flash = flash;
  $scope.hover = false;
  $scope.newBook = {};

  $scope.createBook = function() {
    $('.has-error').removeClass('has-error');
    $('.help-block').remove();

    new Book($scope.newBook).create().then(function() {
      flash.setMessage('Buch wurde hinzugefügt!');
      $scope.newBook = {};
      $state.go($state.current, {}, {reload: true});
    }, function() {
      console.log('Create Error');
    });
  };
});
