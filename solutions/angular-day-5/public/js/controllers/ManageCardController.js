app.controller('ManageCardController', function ($scope, $stateParams, FlashCardsFactory) {

    FlashCardsFactory.getCardById($stateParams.cardId).then(function (card) {
        $scope.card = card;
    });

});