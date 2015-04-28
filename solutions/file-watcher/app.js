var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var async = require('async');

// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
//console.log(process.argv);
var filenames = process.argv.slice(2);
console.log(filenames);

// create the express app
var app = express();

app.set('view engine', 'ejs');

// connect the Morgan logging middleware to our app
app.use( logger('dev') );

// start a server listening on port 1234
app.listen( 1234 );

// when someone requests http://localhost:1234/, run the callback
// function listed here and respond with the data
// we call this the "/" (or "Root") route.
app.get("/", function(request, response) {

    async.map(filenames, function (filename, done) {
        fs.readFile(filename, function (err, contents) {
            var transformedData = {
                id: filename.replace(/[^0-9]/ig, ""),
                data: contents.toString(),
                filename: filename
            };
            done(err, transformedData);
        });
    }, function (err, arrayOfFileData) {
        response.render('mainView', { files: arrayOfFileData });
    });

});