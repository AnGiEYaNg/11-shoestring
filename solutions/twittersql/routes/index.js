var router = require('express').Router();

var tweetBank = require('../tweetBank');

var models = require('../models')

function routes (io) {
	router.get('/', function (req, res) {
		// send the index.html
		var allTweetsPromise = models.Tweet.findAll({include: [models.User]})

		allTweetsPromise.then(function(allTweets) {
			console.log(JSON.stringify(allTweets, null, 2))
			res.render('index', {
				title: 'Twitter.js - all tweets',
				showForm: true,
				tweets: allTweets
			});
		})

	});

	router.get('/users/:name', function (req, res) {
		var userName = req.params.name,
				user;
		
		models.User
		  .find({ where: { name: userName } })
		  .then(function(user_) {
		  	user = user_
		  	return user.getTweets()
		  })
		  .then(function(tweets) {

		  	tweets = tweets.map(function(tweet) {
		  		tweet.User = user
		  		return tweet
		  	})

				res.render('index', {
					title: 'Posts by - ' + userName,
					showForm: true,
					tweets: tweets
				});
		  })

	});

	router.get('/users/:name/tweets/:id', function (req, res) {
		var tweetId = parseInt(req.params.id)

		models.Tweet
			.findAll({
				where: { id: tweetId },
				include: [models.User]
			})
			.then(function(tweets) {
				res.render('index', {
					title: 'Tweet ' + tweetId + ' by ',
					tweets: tweets
				});
			})

	});

	router.post('/submit', function (req, res) {
		var tweetName = req.body.name,
			tweetText = req.body.text;

		models.User
		  .findOrCreate({ where: { name: tweetName } }, { })
		  .spread(function(user) {
		  	return models.Tweet.create({
		  		UserId: user.id,
		  		tweet: tweetText
		  	})//user.addTweet({ tweet: tweetText })
		  })
		  .then(function(tweet) {
		  	res.redirect('/')
		  })

		// var allTweets = tweetBank.list(),
		// 	newTweet = allTweets[allTweets.length - 1];
		// io.sockets.emit('new_tweet', newTweet);
		// res.redirect('/');
	});

	return router;
}


module.exports = routes;