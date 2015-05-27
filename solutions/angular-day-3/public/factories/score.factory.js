angular.module('flashCards')
  .factory('Score', function() {
    return {
      correct: 0,
      incorrect: 0
    }
  })
