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
      console.log('Sequence test passed!')
    }
  });
});

app.controller('BookstoreCtrl', function($http, $resource, hotkeys) {
  var Book = $resource('http://localhost:3000/books/:id', {id: '@id'});

  var store = this;
  store.books = Book.query();
  store.newBook = {};
  store.active = 1;

  this.setActive = function(newActive) {
    store.active = newActive;
  };

  this.isActive = function(listElement) {
    return store.active === listElement;
  };

  this.addBook = function() {
    var returnedBook = Book.save(store.newBook);

    if(returnedBook['errors']) {
    }
    else {
      store.books.push(returnedBook);
    }

    store.active = returnedBook.id

    //store.newBook.id = store.books[store.books.length - 1].id + 1;
    store.newBook = {};
  };

  this.removeBook = function(book) {
    // TODO: LETZTES BUCH LÖSCHEN
    var index = store.books.indexOf(book);
    if(store.books.length === 1) {
      store.active = 0;
    }
    else if(store.books[index + 1]) {
      store.active = store.books[index + 1].id;
    }
    else {
      store.active = store.books[index - 1].id;
    }

    store.books.splice(index, 1);
  };
});

app.directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
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