angular.module('flashCards')
  .controller('ScoreController', function($scope, Score) {
    $scope.score = Score
  })