//jshint browser: true
Modernizr.load({
    test: Modernizr.inputtypes.date,
    yep: 'js/success.js',
    nope: 'js/fail.js',
    complete: function () {
//        this will run after the JS file is loaded (based on the yep / nope case)
        console.log("The Modernizr test is complete.");
    }
});
