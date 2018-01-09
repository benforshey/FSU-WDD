var express = require('express');
var router = express.Router();
var User = require('../models/User');

// redirect request from home page to question 1
router.get('/', function(req, res, next) {
    console.log("redirecting from home page");
    res.redirect('/1');
});

// question controller
router.get('/:path', function(req, res, next) {
    var re = /^\d+$/,
        path = req.params.path;

    if (re.test(path) && (path > 0.0 && path <= 52.0)) {  // if the path variable is a valid input for my content (float to prevent craziness)
        var position = Number(path);  // convert the string to a number (for prev / next functions)

        function partFinder(p) {  // return themeing / part information per position
            var position = p;
            if (position < 21) {
                return {
                    "class" : "bodyTheme-one",
                    "part" : "One",
                    "tag" : "God, creation and fall, law"
                };
            } else if (position < 36) {
                return {
                    "class" : "bodyTheme-two",
                    "part" : "Two",
                    "tag" : "Christ, redemption, grace"
                };
            } else {
                return {
                    "class" : "bodyTheme-three",
                    "part" : "Three",
                    "tag" : "Spirit, restoration, growing in grace"
                };
            }
        }

        res.locals.position = position;  // for use in displaying question number
        res.locals.nextPosition = position < 52 ? position + 1 : 1;  // looping for "next" functionality
        res.locals.prevPosition = position > 1 ? position - 1 : 52;  // looping for "prev" functionality
        res.locals.arrayIndex = position - 1;  // adjusted for zero-based array index; more semantic than just using prevPosition
        res.locals.section = partFinder(position);

        if (typeof req.user !== 'undefined' && req.user instanceof User) {  // if the user is logged in (and is indeed a User type)

            if (req.headers.purpose === 'prefetch') {  // if the browser is prefetching
                User.writeProgress(req.user, position - 1);  // write the correct position (accounting for array-based notation)
                res.locals.sessionProgress = User.readProgress(req.user) -1;  // set for DOM use (client-side progress syncing), adjusting for prefetching
            } else {  // not prefetching
                User.writeProgress(req.user, position -1);   // write the correct position (accounting for array-based notation)
                res.locals.sessionProgress = User.readProgress(req.user);  // set for DOM use (client-side progress syncing)
            }
        }
    } else {
        res.redirect('/1');  // default to first question
    }
    res.render('index');
});

module.exports = router;
