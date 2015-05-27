angular.module('flashCards')
  .directive('borderOnHover', function() {
    return {
      restrict: 'A',
      link: function(scope, el, attrs) {
        console.log('link method is running')
        el.on('mouseenter', function() {
          console.group('Events for element')
          console.log(el)
          console.log('mouse enter has fired')
          el.css('border-color', 'red')
        })

        el.on('mouseleave', function() {
          console.log('mouse leave has fired')
          console.groupEnd('Events for element')
          el.css('border-color', 'blue')
        })
      }
    }
  })