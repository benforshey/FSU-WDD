window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
//            could also use save() and later restore()
            var shadowDefault = ctx.shadowColor;

            ctx.shadowColor = '#000000';
            ctx.shadowOffsetX = '10';
            ctx.shadowOffsetY = '10';
            ctx.shadowBlur = '10';
            ctx.fillStyle = 'blue';
            ctx.fillRect(20, 20, 200, 100);

            ctx.fillStyle = 'green';
            ctx.shadowColor = 'rgba(0, 100, 100, .5)';
            ctx.shadowOffsetX = '5';
            ctx.shadowOffsetY = '5';
            ctx.shadowBlur = '5';
            ctx.font = '2em Georgia';
            ctx.fillText('Drawing text on a <canvas>.', 250, 75);

            ctx.lineCap = 'round';
            ctx.lineWidth = '25';
            ctx.shadowColor = 'rgba(150, 0, 150, .5)';
            ctx.shadowOffsetX = '5';
            ctx.shadowOffsetY = '5';
            ctx.shadowBlur = '15';
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(50, 200);
            ctx.lineTo(450, 200);
            ctx.stroke();

            ctx.shadowColor = shadowDefault;
            ctx.fillStyle = 'blue';
            ctx.fillRect(20, 225, 200, 50);
        }
    }
}
