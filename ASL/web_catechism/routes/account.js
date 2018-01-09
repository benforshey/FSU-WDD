var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill('DJfVhL3MtPMIdjpRbDUOwg');

passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    function(email, password, done) {
        User.getByEmail(email, function(error, user){
            if (error) {
                throw error;
            }
            if (!user) {
                return done(null, false, {
                    message: "That account wasn't found. Have you <a href='/account/register'>registered an account</a> yet?"
                });
            }

            User.matchPassword(password, user.password, function(error, isMatch) {
                if (error) {
                    throw error
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: "Your password wasn't correct. Do you need to <a href='/account/forgot'>reset your password</a>?"
                    });
                }
            });
        });
    })
);


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getById(id, function(err, user) {
        done(err, user);
    });
});

// block access to account unless user is authenticated
function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/account/login');
    }
}

// GET listening
router.get('/', ensureAuthentication, function(req, res) {
    res.locals.sessionProgress = User.readProgress(req.user);
    res.render('account');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/1');
});

router.get('/forgot', function(req, res) {
    res.render('forgot');
});

router.get('/reset', function(req, res) {
    res.render('reset');
});

router.get('/delete', ensureAuthentication, function(req, res) {
    User.deleteUser(req.user, function() {
        res.redirect('/1');
    });
});

// POST listening
router.post('/register', function(req, res) {
    // get values by name attribute
    var email = req.body.email,
        password = req.body.password;

    // validate inputs parameters
    req.checkBody('email', "Email field must not be empty.").notEmpty();
    req.checkBody('email', "You must enter a valid email address.").isEmail();
    req.checkBody('password', "Password field must not be empty.").notEmpty();
    req.checkBody('password', "Your password must be longer than 6 characters.").len(6);

    // sanitizing email input
    req.sanitize('email').escape();

    // check for validation errors and assign error array of objects to variable
    var errors = req.validationErrors();

    // if there are errors, render the register page and pass back input contents for editing
    if (typeof errors !== 'undefined' && errors instanceof Array) {
        res.render('register', {
            errors: errors,
            email: email,
            password: password
        });
    } else {  // no errors, so create user (per User defined in models/User)
        var newUser = new User({
            email: email,
            password: password
        });

        User.getByEmail(email, function(error, user) {  // prevents duplicate accounts by checking for existing email
            if (error) {
                throw error;
            }
            if (!user) {  // no user was found, so create one
                User.createUser(newUser, function (error) { // create instance of User
                    if (error) {
                        throw error;
                    }
                });
                req.flash('success', "You are now registered! Please log in to your account.");  // flash confirmation
                res.redirect('/account/login');  // redirect to login
            } else {  // a user was found, so offer password reset
                req.flash('error', "That email address is already associated with an account. Do you need to <a href='/account/forgot'>reset your password</a>?");
                res.redirect('/account/login');
            }
        });
    }
});

router.post('/forgot', function(req, res){
    var emailAddress = req.body.email;

    // validate inputs parameters
    req.checkBody('email', "Email field must not be empty.").notEmpty();
    req.checkBody('email', "You must enter a valid email address.").isEmail();

    // sanitizing email input
    req.sanitize('email').escape();

    // check for validation errors and assign error array of objects to variable
    var errors = req.validationErrors();

    if (typeof errors !== 'undefined' && errors instanceof Array) {
        res.render('forgot', {
            errors: errors,
            email: emailAddress
        });
    } else {  // no errors, so proceed
        User.getByEmail(emailAddress, function(error, user) {
            if (error) {
                throw error;
            }
            if (!user) {  // if the user isn't found
                req.flash('error', "That email address is not associated with an account. Do you need to <a href='/account/register'>register an account</a>?");
                res.redirect('/account/forgot');
            } else {
                var token = User.genExpiryToken(user);  // generates token to database and returns to var token

                mandrillClient.messages.send({"message": {  // send a message through Mandrill
                    "text": "Someone (hopefully you) requested a password reset on your account, so I've emailed you a password reset token that expires within 1 hour. \n\n The token to reset your password is: " + token + "\n\n Please got to www.webcatechism.com/account/reset and enter this token within 1 hour to reset your password. If you do nothing the token will expire and your password will not be reset. You may always request a password reset at another time.",
                    "subject": "Password Reset Token from Web Catechism",
                    "from_email": "hello@benforshey.com",
                    "from_name": "Ben Forshey",
                    "to": [{
                        "email": emailAddress,
                        "type": "to"
                    }],
                    "important": true
                }}, function(result) {
                    req.flash('success', "Your password reset email has been sent. Please enter the token you received in your email and create a new password.");
                    res.redirect('/account/reset');
                }, function (err) {
                    console.log('A mandrill error occurred: ' + err.name + ' - ' + err.message);
                    res.redirect('/account/login');
                });
            }
        });
    }
});

router.post('/reset', function(req, res){
    // get values by name
    var token = req.body.token,
        password = req.body.password;

    // validate inputs parameters
    req.checkBody('password', "Password field must not be empty.").notEmpty();
    req.checkBody('password', "Your password must be longer than 6 characters.").len(6);

    // sanitize token
    req.sanitize('token').escape();

    // check for validation errors and assign error array of objects to variable
    var errors = req.validationErrors();

    // if there are errors, render the register page and pass back input contents for editing
    if (typeof errors !== 'undefined' && errors instanceof Array) {
        res.render('reset', {
            errors: errors,
            password: password
        });
    } else {  // no errors, so update user

        User.getByToken(token, function(error, user) {
            if (error) {
                throw error;
            }
            var now = Date.now();

            if (!user) {  // if the token wasn't found in the database
                    req.flash('error', "Your token wasn't found. Please try the password rest process again.");
                    res.redirect('/account/forgot');
            } else {  // if the token was found in the database
                if (now <= user.resetPasswordExpiry) {  // if it hasn't yet been longer than 1 hour
                    User.resetPassword(user, password);  // reset the password
                    req.flash('success', "Your password has been reset. Please log in.");
                    res.redirect('/account/login');
                } else {
                    req.flash('error', "Your token has expired (it's only valid for 1 hour). Please try the password rest process again.");
                    res.redirect('/account/forgot');
                }
            }
        });
    }
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/account/login',
    failureFlash: true
}), function(req, res) {
    req.flash('success', "You are logged in.");
    res.redirect('/account')
});

module.exports = router;
