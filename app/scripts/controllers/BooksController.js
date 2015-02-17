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

  $scope.$on('ngRepeatFinished', function() {
    $('.star-rating').rating({
      min: 0, max: 5, step: 1, size: 'xs', showCaption: false, showClear: false
    });

    $('.inactive-star-rating').rating({
      min: 0, max: 5, step: 1, size: 'xs', showCaption: false, showClear: false, readonly: true
    });
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

  $scope.updateBook = function(book) {
    book.update().then(function() {
      console.log('worked');
    }, function() {
      console.log('didnt work');
    });
  };
});

app.controller('BooksCreateController', function($scope, $state, $stateParams, flash, Book, $timeout) {
  $scope.flash = flash;
  $scope.hover = false;
  $scope.newBook = { rating: 3 };


  $timeout(function() {
    $('#create-rating').rating({
      stars: 5, min: 0, max: 5, step: 1, size: 'md', showClear: false, showCaption: false
    });
  }, 500);

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
