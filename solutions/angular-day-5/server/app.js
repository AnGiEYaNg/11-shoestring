var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app;

var publicPath = path.join(__dirname, '../public');
var nodeModulesPath = path.join(__dirname, '../node_modules');
var indexHtmlPath = path.join(__dirname, '../index.html');

var FlashCardModel = require('./models/flash-card-model');

app.use(express.static(publicPath));
app.use(express.static(nodeModulesPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    res.sendFile(indexHtmlPath);
});


app.get('/cards', function (req, res) {

    var modelParams = req.query.category ? { category: req.query.category } : {};

    FlashCardModel.find(modelParams, function (err, cards) {
        setTimeout(function () {
            res.send(cards);
        }, Math.random() * 1000);
    });

});

app.get('/cards/:id', function (req, res) {
    var cardId = req.params.id;
    FlashCardModel.findById(cardId).exec().then(function (card) {
        res.send(card);
    }, function (err) {
        res.status(500).send(err.message);
    });
});

app.post('/cards', function (req, res) {

    var card = req.body;

    FlashCardModel.create(card).then(function (createdCard) {
        res.send(createdCard);
    }, function (err) {
        res.status(500).send(err.message);
    });

});

app.delete('/cards/:id', function (req, res) {

    var cardId = req.params.id;

    FlashCardModel.findByIdAndRemove(cardId).exec().then(function () {
        res.end();
    }, function (err) {
        res.status(500).send(err.message);
    });

});

app.put('/cards/:id', function (req, res) {

    var editedCard = req.body;

    FlashCardModel.findByIdAndUpdate(req.params.id, editedCard)
        .exec()
        .then(function (card) {
            res.send(card);
        }, function (err) {
            res.status(500).send(err.message);
        });

});