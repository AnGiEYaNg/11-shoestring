var days = []
var currentDay

var Day = function(props) {
  this.dayNum = days.length + 1

  this.hotels = []
  this.restaurants = []
  this.thingsToDo = []
  this.markers = []

  this.drawDayBtn()
  this.drawDayPanel()

  $('#itinerary #day-panel').replaceWith(this.$dayPanel)
  currentDay = this

  if(props) {
    for(var prop in props) {
      this[prop] = props[prop]
    }

    var self = this;
    ['hotels', 'restaurants', 'thingsToDo'].forEach(function(type) {
      self[type] = self[type].map(function(id) {
        var activity = data.get(type, id)
        self.addActivity(type, activity)
        console.log(activity)
        return activity
      })
    })
  }

  if(days[this.dayNum-2]) {
    days[this.dayNum-2].clearMarkersFromMap()
  }
  this.addMarkersToMap()

  
}






Day.prototype.clearMarkersFromMap = function() {
  this.markers.forEach(function(marker) {
    marker.setMap(null)
  })
}
Day.prototype.addMarkersToMap = function() {
  this.markers.forEach(function(marker) {
    marker.setMap(map)
  })
}

Day.prototype.drawDayPanel = function() {
  this.$dayPanel = templates.get('day-panel')
  this.$dayPanel.append(this.dayNum)
}

Day.prototype.addActivity = function(type, activity) {
  var $list = $('#itinerary  .' + type + '-group')
  $listItem = templates.get('itinerary-item')
  $listItem.find('.title').text(activity.name)
  $list.append($listItem)
  console.log($list, $listItem)
  var marker = drawLocation(activity.place[0].location)
  this.markers.push(marker)
  //find the right ul
  //get a new template
  //populate it
  //put it in the right ul




  $.ajax({
    type: 'post',
    url: '/days/' + this.dayNum + '/activities',
    data: {
      type: type,
      id: activity._id
    },
    fail: function() {
      console.warn('failure to add activity to day', arguments)
    }
  })


}

Day.prototype.drawDayBtn = function() {
  var self = this

  var $dayBtn = templates.get('day-btn')//$('<button class="btn btn-circle day-btn">' + this.dayNum + '</button>')
  $dayBtn.text(this.dayNum)
  $('#add-day').before($dayBtn)

  $dayBtn.on('click', function() {
    if(currentDay) currentDay.clearMarkersFromMap()
    currentDay = self
    currentDay.addMarkersToMap()
    $('#itinerary #day-panel').replaceWith(self.$dayPanel)
  })
}

$('#add-day').on('click', function() {
  var day = new Day()
  days.push(day)
  // persist!
  $.ajax({
    type: 'post',
    url: '/days',
    data: {
      dayNum: day.dayNum
    },
    success: function(body, statusString, someWeirdObject) {
      day._id = body._id
    },
    fail: function() {
      console.warn('error!', arguments)
    }
  })
})


$(function() {
  $.getJSON('/days', function(serverDays) {
    serverDays.forEach(function(serverDay) {
      days.push(new Day(serverDay))
    })
  })
})
















