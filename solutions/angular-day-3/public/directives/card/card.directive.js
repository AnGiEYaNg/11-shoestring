angular.module('flashCards')
  .directive('card', function(Score) {
    return {
      restrict: 'E',
      templateUrl: 'directives/card/card.html',
      scope: {
        flashCard: '='
      },
      link: function(scope) {
        scope.answerQuestion = function (answer, flashCard) {
          if (!flashCard.answered) {
            flashCard.answered = true;
            flashCard.answeredCorrectly = answer.correct;
            answer.correct ? Score.correct++ : Score.incorrect++
          }
        };
      }
    }
  })