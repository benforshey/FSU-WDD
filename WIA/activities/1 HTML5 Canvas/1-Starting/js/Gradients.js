window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            var linGrd = ctx.createLinearGradient(20, 20, 20, 280);
            linGrd.addColorStop(0, '#f00');
            linGrd.addColorStop(.5, '#00f');
            linGrd.addColorStop(1, '#0f0');

            ctx.fillStyle = linGrd;
            ctx.fillRect(20, 20, 200, 280);

            var radGrd = ctx.createRadialGradient(525, 150, 20, 525, 150, 100);
            radGrd.addColorStop(0, '#f00');
            radGrd.addColorStop(.5, '#00f');
            radGrd.addColorStop(1, '#0f0');

            ctx.fillStyle = radGrd;
            ctx.beginPath();
            ctx.arc(525, 150, 100, 0, 2 * Math.PI);
            ctx.fill();

        }
    }
}
