'use strict'

app = angular.module('bookstoreAngularApp.directives', [])

app.directive 'holderFix', () ->
  return {
    link: (scope, element) ->
      Holder.run
        images: element[0]
        nocss: true
      return
  }

app.directive 'hoverOpenDirective', () ->
  return {
    restrict: 'A'
    link: (scope, element) ->
      element.on 'mouseenter', () ->
        element.addClass 'open'
        return
      element.on 'mouseleave', () ->
        element.removeClass 'open'
        return
      return
  }

app.directive 'onFinishRender', ($timeout) ->
  return {
    restrict: 'A'
    link: (scope) ->
      if scope.$last == true
        $timeout () ->
          scope.$emit 'ngRepeatFinished'
          return
      return
  }
