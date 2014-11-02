'use strict';

var app = angular.module('bookstoreAngularApp');

app.controller('MainCtrl', function() {
  var main = this;
  main.hover = false;
});

app.controller('BookstoreCtrl', function($http) {
  var store = this;
  store.books = [];
  store.newBook = {};
  store.active = 1;

  $http.get('http://localhost:3000/books')
    .success(function(data) {
      store.books = data;
    });
    //.error(function(data) {
    //  store.books = [{title:'Book 1', author:'Author 1', id: "1", isbn: "12345"},
    //                  {title:'Book 2', author:'Author 2', id: "2", isbn: "67890"},
    //                  {title:'Book 3', author:'Author 3', id: "3", isbn: "13579"}];
    //
    //
    //});

    this.setActive = function(newActive) {
      store.active = newActive;
    };

    this.isActive = function(listElement) {
      return store.active === listElement;
    };

    this.addBook = function() {
      store.newBook.id = store.books[store.books.length - 1].id + 1;
      store.books.push(store.newBook);
      store.newBook = {};
    };
});

app.directive('clickAnywhereButHere', function($document) {
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      elem.bind('click', function(e) {
        // this part keeps it from firing the click on the document.
        e.stopPropagation();
      });
      $document.bind('click', function() {
        // magic here.
        scope.$apply(attr.clickAnywhereButHere);
      });
    }
  };
});