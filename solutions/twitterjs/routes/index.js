var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

router.get('/users/:name', function (req, res) {

    var usersName = req.params.name;

    var tweetsFromUser = tweetBank.find({ name: usersName });

    res.render('index', {
        title: 'Twitter.js',
        tweets: tweetsFromUser,
        name: usersName,
        showForm: true
    });

});

router.get('/users/:name/tweets/:id', function (req, res) {
    // /users/Joe/tweets/1 {name: 'Joe', id:1}

    var usersName = req.params.name;
    var tweetId = parseInt(req.params.id);

    var tweet = tweetBank.find({ name: usersName, id: tweetId });

    res.render('index', {
        title: 'Twitter.js',
        tweets: tweet,
        name: usersName,
        showForm: true
    });

});

router.post('/submit', function (req, res) {

    var nameOfUser = req.body.name;
    var tweetText = req.body.text;

    tweetBank.add(nameOfUser, tweetText);

    res.redirect('/users/' + nameOfUser);

});

module.exports = router;