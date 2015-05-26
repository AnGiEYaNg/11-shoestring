app.controller('MainController', function ($scope, Card, Score) {
	// $scope.flashCards = whateverName;
  $scope.categories = [
   'MongoDB',
   'Express',
   'Angular',
   'Node'
 ];


  $scope.switchCategory = function(category) {
    Card.getByCategory(category).then(function(cards) {
      $scope.flashCards = cards
    })
  }

  $scope.reset = function() {
    Card.getAll()
      .then(function(cards) {
        Score.correct = 0
        Score.incorrect = 0
        $scope.flashCards = cards
      })
  }

  $scope.reset()

	$scope.answerQuestion = function (answer, flashCard) {
		if (!flashCard.answered) {
			flashCard.answered = true;
			flashCard.answeredCorrectly = answer.correct;
      answer.correct ? Score.correct++ : Score.incorrect++
		}
	}
});








