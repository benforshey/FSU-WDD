/*jshint
    browser: true,
    devel: true*/

var theCanvas = document.getElementById('Canvas1'),
    ctx = theCanvas.getContext('2d');

ctx.font = '2em Georgia';
ctx.fillText('Canvas is Supported!', 20, 60);
console.log("DrawText.js fired.");
