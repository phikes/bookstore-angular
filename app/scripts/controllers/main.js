'use strict';

var app = angular.module('bookstoreAngularApp');

app.controller('MainCtrl', function(hotkeys) {
  var main = this;
  main.hover = false;

  hotkeys.add({
    combo: 'ctrl+1',
    description: 'Öffnet bzw. schließt das Formular zum Hinzufügen eines Buches',
    callback: function() {
      main.hover = !main.hover;
    }
  });
  hotkeys.add({
    combo: '8 8',
    description: 'Sequence Test',
    callback: function() {
      console.log('Sequence test passed!');
    }
  });
});

app.controller('BookstoreCtrl', function($http, $resource, $scope, hotkeys) {
  var Book = $resource('http://localhost:3000/api/books/:id', {id: '@id'});

  //var store = this;
  $scope.books = Book.query();
  $scope.newBook = {};
  $scope.active = 1;

  $scope.setActive = function(newActive) {
    $scope.active = newActive;
  };

  $scope.isActive = function(listElement) {
    return $scope.active === listElement;
  };

  $scope.addBook = function() {
    //var returnedBook = Book.save($scope.newBook);
    //$scope.books.push(returnedBook);
    //$scope.active = returnedBook.id
    //$scope.newBook.id = $scope.books[$scope.books.length - 1].id + 1;
    
    $scope.books.push({title: 'cancer', author: 'attack', isbn: '12345', rating: 4, id: 4});
    //console.log($scope.newBook);
    $scope.newBook = {};
  };

  $scope.removeBook = function(book) {
    var index = $scope.books.indexOf(book);
    if($scope.books.length === 1) {
      $scope.active = 0;
    }
    else if($scope.books[index + 1]) {
      $scope.active = $scope.books[index + 1].id;
    }
    else {
      $scope.active = $scope.books[index - 1].id;
    }

    $scope.books.splice(index, 1);
  };

  $scope.removeActiveBook = function() {
    var index = $scope.books.indexOf($.grep($scope.books, function (element) {
        return element.id === $scope.active;
    })[0]);

    if($scope.books.length === 1) {
      $scope.active = 0;
    }
    else if($scope.books[index + 1]) {
      $scope.active = $scope.books[index + 1].id;
    }
    else {
      $scope.active = $scope.books[index - 1].id;
    }

    $scope.books.splice(index, 1);
  };
});

app.directive('holderFix', function () {
    return {
        link: function (scope, element) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});

// app.directive('clickAnywhereButHere', function($document) {
//   return {
//     restrict: 'A',
//     link: function(scope, elem, attr) {
//       elem.bind('click', function(e) {
//         // this part keeps it from firing the click on the document.
//         e.stopPropagation();
//       });
//       $document.bind('click', function() {
//         // magic here.
//         scope.$apply(attr.clickAnywhereButHere);
//       });
//     }
//   };
// });