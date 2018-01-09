var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

// declare routes for view middleware
var index = require('./routes/index');
var account = require('./routes/account');

var app = express();

app.locals.content = require('./data/content.json');  // requiring (and initializing) the content globally

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validator session middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// express session middleware
app.use(session({
    name: "web_catechism.session",
    secret: "$2a$10$GkqJ4IdggIdYzM5Ldm3HyOlYknKsnqgt5thGtDFt61FEoH9dJKnqG",
    saveUninitialized: true,
    resave: false
}));

// passport session middleware
app.use(passport.initialize());  // starts passport
app.use(passport.session());  // starts sessions

// connect-flash and express-messages middleware
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// persistent user object (if logged in) for all views
app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;  // set user object to the session's user object or null
    next();  // pass on to the next router
});

// view middleware
app.use('/account', account);  // order is important, since root redirects to questions via localStorage
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
