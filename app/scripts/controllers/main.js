'use strict';

angular.module('bookstoreAngularApp')
  .controller('BookstoreCtrl', function ($scope) {
    $scope.books = [{title: 'Book 1', author: 'Author 1'},
                    {title: 'Book 2', author: 'Author 2'},
                    {title: 'Book 3', author: 'Author 3'}];


  });
