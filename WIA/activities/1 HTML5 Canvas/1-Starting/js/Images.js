window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {
            var srcImg = document.getElementById('img1');

//            basic image
//            ctx.drawImage(srcImg, 0, 0);

//            scale image
//            ctx.drawImage(srcImg, 50, 50, 240, 300);

//            slice image
            ctx.drawImage(srcImg, 285, 40, 95, 140, 50, 50, 190, 280);

//            var srcVid = document.getElementById('vid1');
//
//            srcVid.play();
//            setInterval(function () {
//                ctx.drawImage(srcVid, 0, 0, 480, 270);
//            }, 35);


        }
    }
}
