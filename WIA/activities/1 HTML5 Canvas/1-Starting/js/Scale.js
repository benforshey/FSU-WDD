window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, 100, 50);
//            optionally, put save and restore in to "undo" the scale effect without complicated math
            ctx.scale(1.5, 2);
//            notice that scale affects origin points as well as width and height
            ctx.fillRect(0, 50, 100, 50);

            ctx.fillStyle = 'purple';
            ctx.scale(.5, .5);
//            again, notice that the affects of a transform are additive; this scale maths from where the previous scale left off
            ctx.fillRect(0, 100, 100, 50);

        }
    }
}
