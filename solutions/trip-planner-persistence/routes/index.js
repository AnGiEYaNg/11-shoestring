var express = require('express')

var router = module.exports = express.Router()

var models = require('../models')

var Promise = require('bluebird')


router.get('/', function(req, res, next) {
  Promise.join(
    models.Restaurant.find().exec(),
    models.ThingToDo.find().exec(),
    models.Hotel.find().exec()
  )
  .spread(function(restaurants, thingsToDo, hotels) {
    res.render('index', {
      hotels: hotels,
      restaurants: restaurants,
      thingsToDo: thingsToDo
    })
  })
})

router.use('/days', require('./days'))







