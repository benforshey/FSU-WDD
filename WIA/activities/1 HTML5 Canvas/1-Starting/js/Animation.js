//jshint browser: true
window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            var srcImg = document.getElementById('img1'),
                rotation = 0;

            ctx.translate(theCanvas.width / 2, theCanvas.height / 2);

            setInterval(function () {

                ctx.clearRect(-300, -300, theCanvas.width, theCanvas.height);
                ctx.rotate(rotation * (Math.PI / 180));
                ctx.drawImage(srcImg, -75, -75);
                rotation += 1;
            }, 300);
        }
    }
};
