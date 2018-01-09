window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            /*ctx.fillStyle = 'blue';
            ctx.fillRect(150, 50, 100, 50);
//            move the origin to be centered on the above rectangle's origin
            ctx.translate(200, 75);
            ctx.rotate(.5);
            ctx.fillStyle = 'red';
//            adjust the origin to make up for the dimensions of the rectangle, so that it rotates on center
            ctx.fillRect(-50, -25, 100, 50);*/

            var arcSize = (Math.PI / 180) * 360;
            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

            for (var degrees = 0; degrees <= 360; degrees = degrees + 1) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(100, 0);
                ctx.stroke();
                ctx.rotate(arcSize);
            }

        }
    }
}
