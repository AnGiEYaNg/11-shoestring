var router = require('express').Router(),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook');

var User = require('./user.model');

var config = require('./config');

passport.use(
	new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL
	},
	function (accessToken, refreshToken, profile, done) {
		// register this person as a user
		// find or create facebook user by profile id
		User.findOne({facebook: {id: profile.id}}).exec(function (err, user) {
			if (err) done(err);
			else if (user) done(null, user);
			else {
				User.create({
					facebook: {
						id: profile.id,
						token: accessToken,
						name: profile.name.givenName + ' ' + profile.name.familyName,
						email: profile.emails[0].value
					}
				}, done);
			}
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id).exec(done);
});

router.get('/facebook', passport.authenticate('facebook', {
	scope: 'email'
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
	failureRedirect: '/login',
	successRedirect: '/'
}));

module.exports = router;