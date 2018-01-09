Modernizr.load({
    test: Modernizr.canvas,
    yep: ['js/success.js', 'js/DrawText.js'],
    nope: 'includes/webshim/minified/polyfiller.js',
    complete: function () {
        if (!Modernizr.canvas) {
            Modernizr.load('js/fail.js');
            Modernizr.load('js/DrawText.js');
            console.log("Modernizr complete fired.");
        }
    }
});
