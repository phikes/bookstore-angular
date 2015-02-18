'use strict';

app = angular.module('bookstoreAngularApp.services', ['rails']);

app.factory 'flash', ($rootScope) ->
  queue = []
  currentMessage = ''

  $rootScope.$on '$stateChangeSuccess', () ->
    currentMessage = queue.shift() or ''
    return

  return {
    setMessage: (message) ->
      queue.push message
      return
    getMessage: () ->
      currentMessage
  }

app.factory 'Book', ['railsResourceFactory', (railsResourceFactory) ->
  railsResourceFactory
    url: 'http://localhost:3000/api/books'
    name: 'book'
]
