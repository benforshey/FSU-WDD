window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, 100, 50);

//            translate origin to middle of canvas
            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
            ctx.fillRect(0, 0, 100, 50);

            ctx.fillStyle = 'red';
//            move tranform translate (which are additive) origin back to uppper left
            ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
//            slight offset, just to show both rectangles
            ctx.fillRect(10, 10, 100, 50);

            ctx.fillStyle = 'yellow';
            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
//            move origin half of width(x) and half of height(y) for a true canvas center
            ctx.fillRect(-50, -25, 100, 50);



        }
    }
}
