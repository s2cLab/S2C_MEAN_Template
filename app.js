var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");
var fs = require('fs');

var app = express();

var appClientFiles = [
  'app_client/app.js',
  'app_client/home/home.controller.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js'
];

var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/appName.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'appName.min.js');
  }
});

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;