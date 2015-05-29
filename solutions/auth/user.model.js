var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.connect('mongodb://localhost/auth');
mongoose.connection.on('error', console.error.bind(console, 'database connection error:'));

var userSchema = mongoose.Schema({
	username: String,
	hashedPassword: String,
	salt: {
		type: String,
		default: makeSalt
	}
});

function makeSalt () {
	return crypto.randomBytes(16).toString('base64');
}

userSchema.virtual('password')
.set(function (plaintext) {
	this.hashedPassword = this.hash(plaintext);
});

userSchema.methods.hash = function (plaintext) {
	return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64).toString('base64');
}

userSchema.methods.authenticate = function (attempt) {
	return this.hashedPassword === this.hash(attempt);
};

module.exports = mongoose.model('User', userSchema);