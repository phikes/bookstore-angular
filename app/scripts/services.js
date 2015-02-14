'use strict';

var app = angular.module('bookstoreAngularApp.services', ['rails']);

app.factory('flash', function($rootScope) {
  var queue = [];
  var currentMessage = '';

  $rootScope.$on('$stateChangeSuccess', function() {
    currentMessage = queue.shift() || '';
  });

  return {
    setMessage: function(message) {
      queue.push(message);
    },
    getMessage: function() {
      return currentMessage;
    }
  };
});

app.factory('Book', ['railsResourceFactory', function(railsResourceFactory) {
  return railsResourceFactory({
    url: 'http://localhost:3000/api/books',
    name: 'book'
  });
}]);
