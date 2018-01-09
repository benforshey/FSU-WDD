window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            var width = theCanvas.width / 2,
                height = theCanvas.height / 2,
                radius = 75,
                offset = 50;

            ctx.save();

            ctx.beginPath();
            ctx.arc(width, height, radius, 0, 2 * Math.PI);
            ctx.clip();

            ctx.beginPath();
            ctx.arc(width - offset, height - offset, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'blue';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(width + offset, height, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'yellow';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(width, height + offset, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();

            ctx.restore();
            ctx.beginPath();
            ctx.arc(width, height, radius, 0, 2 * Math.PI);
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
        }
    }
}
