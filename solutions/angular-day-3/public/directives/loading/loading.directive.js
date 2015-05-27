angular.module('flashCards')
  .directive('loading', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/loading/loading.html'
    }
  })