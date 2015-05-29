var router = require('express').Router();

var User = require('./user.model.js');

router.get('/', function (req, res) {
	res.render('home');
});

router.get('/signup', function (req, res) {
	res.render('signup');
});

router.post('/signup', function (req, res, next) {
	User.create(req.body, function (err, user) {
		if (err) next(err);
		else {
			req.session.userId = user._id;
			res.redirect('/success');
		}
	});
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/login', function (req, res, next) {
	User.findOne({username: req.body.username}, function (err, user) {
		if (err) next(err);
		else if (!user) res.redirect('/failure');
		else if (!user.authenticate(req.body.password)) res.redirect('/failure');
		else {
			req.session.userId = user._id;
			res.redirect('/success');
		}
	});
});

router.get('/logout', function (req, res, next) {
	delete req.session.userId;
	res.redirect('/');
});

function isAuthenticated (req, res, next) {
	if (req.session.userId) next();
	else res.redirect('/failure');
}

router.get('/membersOnly', isAuthenticated, function (req, res, next) {
	res.render('secret');
});

router.get('/success', function (req, res) {
	res.render('success');
});

router.get('/failure', function (req, res, next) {
	var err = new Error('Not Authenticated');
	err.status = 401;
	next(err);
});

module.exports = router;