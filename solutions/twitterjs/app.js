var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');

var app = express();
var routes = require('./routes');
app.listen(3000);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());

app.use('/', routes);
