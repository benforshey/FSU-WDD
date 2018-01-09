//jshint browser: true
if (Modernizr.canvas) {
//    canvas supported
    var theCanvas = document.getElementById('Canvas1'),
        ctx = theCanvas.getContext('2d');
    ctx.font = '25pt Georgia';
    ctx.fillText("Canvas is supported", 20, 60);


} else {
//    canvas not supported; use polyfills
}

console.log(Modernizr);

if (Modernizr.draganddrop) {
    ctx.font = '25pt Georgia';
    ctx.fillText("Drag and Drop is supported", 20, 120);
} else {
//    polyfills
}
