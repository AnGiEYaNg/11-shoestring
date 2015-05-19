var express = require('express')
var router = express.Router()

module.exports = router

// adding an activity to a day
// body { type: 'hotels', id: 'asdlkfjsadflkjadfslkj' }
router.post('/', function(req, res, next) {
  console.log('req body', req.body)
  console.log('req day', req.day)
  req.day[req.body.type].addToSet(req.body.id)
  req.day.save()
    .then(function(day) {
      res.sendStatus(201)
    })
    .then(null, next)
  // push the activity id into the correct field in the document
  // save the day
  // send a response
})

router.delete('/:activityId')