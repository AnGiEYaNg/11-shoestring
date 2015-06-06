var app = angular.module('FlashCards', ['ui.router']);

app.config(function ($stateProvider) {

    $stateProvider.state('flashCardList', {
        url: '/',
        templateUrl: 'templates/list.html',
        controller: 'MainController'
    });

    $stateProvider.state('newCard', {
        url: '/add',
        templateUrl: 'templates/new-card-form.html',
        controller: 'NewCardController'
    });

    $stateProvider.state('manageCard', {
        url: '/manage/:cardId',
        controller: 'ManageCardController',
        templateUrl: 'templates/manage-card.html'
    });

    $stateProvider.state('manageCard.delete', {
        url: '/delete',
        templateUrl: 'templates/delete-card.html',
        controller: function ($scope, $stateParams, FlashCardsFactory, $state) {
            $scope.deleteCard = function () {
                FlashCardsFactory.deleteCardById($stateParams.cardId).then(function () {
                    $state.go('flashCardList');
                });
            };
        }
    });

    $stateProvider.state('manageCard.edit', {
        url: '/edit',
        templateUrl: 'templates/edit-card.html',
        controller: function ($scope, $stateParams, FlashCardsFactory, $state) {
            $scope.editCard = function (card) {
                FlashCardsFactory.editCardById($stateParams.cardId, card).then(function () {
                    $state.go('flashCardList');
                });
            };
        }
    });

});