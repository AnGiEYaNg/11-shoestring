var express = require('express'),
	swig = require('swig'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	https = require('https'),
	session = require('express-session');

var app = express();

app.set('views', __dirname + '/pages');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
	secret: 'tongiscool',
	saveUninitialized: false,
	resave: false,
	cookie: {
		secure: true
	}
}));

app.use(require('./routes'));

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	err.status = err.status || 500;
	res.render('error', {error: err});
});

var port = 1337;
var options = {
	cert: fs.readFileSync('cert.pem'),
	key: fs.readFileSync('key.pem')
};
https.createServer(options, app).listen(port, function () {
	console.log('Server ready on port', port);
});