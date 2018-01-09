window.onload = function () {
    'use strict';
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {

            ctx.globalAlpha = 1;

            // Create an array of squares
            var rects = [
                {x: 20, y: 20, width: 75, height: 75 },
                {x: 40, y: 50, width: 75, height: 75 },
                {x: 150, y: 20, width: 75, height: 75 },
                {x: 170, y: 50, width: 75, height: 75 },
                {x: 280, y: 20, width: 75, height: 75 },
                {x: 300, y: 50, width: 75, height: 75 },
                {x: 410, y: 20, width: 75, height: 75 },
                {x: 430, y: 50, width: 75, height: 75 }
            ];

            for (var i = 0, l = rects.length; i < l; i = i +2) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(rects[i].x, rects[i].y, rects[i].width, rects[i].height);
                ctx.fillStyle = 'red';
                ctx.fillRect(rects[i + 1].x, rects[i + 1].y, rects[i + 1].width, rects[i + 1].height);

                ctx.globalAlpha = ctx.globalAlpha - .3;
            };
        }
    }
}
