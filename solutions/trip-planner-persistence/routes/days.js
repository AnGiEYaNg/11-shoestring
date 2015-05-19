var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
module.exports = router

// // list all days
router.get('/', function (req, res, next) {
  mongoose.model('Day')
    .find()
    // .populate('thingsToDo restaurants hotels')
    .exec()
    .then(function(days) {
      res.json(days)
    })
    .then(null, next)
})

// //get one day
// router.get('/:dayId')

// //update a day
// router.put('/:dayId')

router.use('/:id/activities', require('./activities'))

// delete a day
router.delete('/:id')

// add day
router.post('/', function(req, res, next) {
  mongoose
    .model('Day')
    .create(req.body)
    .then(function(day) {
      res.json(day)
    })
    .then(null, next)
})



router.param('id', function(req, res, next, id) {
  mongoose.model('Day')
    .findOne({ dayNum: Number(id) })
    .exec()
    .then(function(day) {
      if(!day) throw new Error('not found')
      req.day = day
      next()
    })
    .then(null, next)
})














