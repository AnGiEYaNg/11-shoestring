angular.module('flashCards')
  .factory('Card', function($http) {
    return {

      getAll: function(options) {
        options = options || {}
        return $http
          .get('/cards', options)
          .then(function(response) {
            return response.data
          })
      },

      getByCategory: function(category) {
        return this.getAll({ 
          params: {
            category: category 
          }
        })
      }
    }
  })