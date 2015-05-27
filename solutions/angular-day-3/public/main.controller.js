app.controller('MainController', function ($scope, Card, Score) {

  $scope.loaded = false;

	// $scope.flashCards = whateverName;
  $scope.categories = [
   'MongoDB',
   'Express',
   'Angular',
   'Node'
 ];


  $scope.switchCategory = function(category) {
    $scope.loaded = false;
    Card.getByCategory(category).then(function(cards) {
      $scope.loaded = true;
      $scope.flashCards = cards
    })
  }

  $scope.reset = function() {
    $scope.loaded = false;
    Card.getAll()
      .then(function(cards) {
        Score.correct = 0
        Score.incorrect = 0
        $scope.loaded = true;
        $scope.flashCards = cards
      })
  }

  $scope.reset()

	
});








