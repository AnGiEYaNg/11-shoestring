app.factory('FlashCardsFactory', function ($http) {

    return {

        getFlashCards: function (category) {

            var queryParams = {};

            if (category) {
                queryParams.category = category;
            }

            return $http.get('/cards', {
                params: queryParams
            }).then(function (response) {
                return response.data;
            });

        },

        addNewCard: function (card) {
           return $http.post('/cards', card).then(function (response) {
               return response.data;
           });
        },

        getCardById: function (id) {
            return $http.get('/cards/' + id).then(function (response) {
                return response.data;
            });
        },

        deleteCardById: function (id) {
            return $http.delete('/cards/' + id);
        },

        editCardById: function (id, card) {
            return $http.put('/cards/' + id, card).then(function (response) {
                return response.data;
            });
        }

    };

});
