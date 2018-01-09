window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
    var c = theCanvas.getContext("2d");
    if (c) {
        c.strokeStyle = 'blue';
        c.lineWidth = 5;

        c.beginPath();
        c.moveTo(50, 200);
        c.bezierCurveTo(50, 100, 200, 100, 200, 150);
        c.stroke();

        c.beginPath();
        c.moveTo(400, 200);
        c.quadraticCurveTo(400, 100, 600, 150);
        c.stroke();

        }
    }
}
