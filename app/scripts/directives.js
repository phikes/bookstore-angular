'use strict';

var app = angular.module('bookstoreAngularApp.directives', []);

app.directive('holderFix', function () {
    return {
        link: function (scope, element) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});

app.directive('hoverOpenDirective', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('mouseenter', function() {
        element.addClass('open');
      });
      element.on('mouseleave', function() {
        element.removeClass('open');
      });
    }
  };
});

app.directive('onFinishRender', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  };
});
