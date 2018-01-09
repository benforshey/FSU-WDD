/* jshint browser: true */
window.onload = function () {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
        var ctx = theCanvas.getContext("2d");
        if (ctx) {

            // Array of all the compositing methods
            var compMethods = ["source-over", "source-in", "source-out", "source-atop", "lighter", "xor", "destination-over", "destination-in", "destination-out", "destination-atop", "darker", "copy" ];

            // Array of 2 squares
            var rects = [
                {x: 20, y: 50, width: 75, height: 75},
                {x: 40, y: 80, width: 75, height: 75}
            ];

            var method = 0;

            for (var i = 0, j = compMethods.length; i < j; i += 1) {
                var canvasName = 'Canvas' + (i + 1),
                    currentCanvas = document.getElementById(canvasName),
                    currentContext = currentCanvas.getContext('2d'),
                    compMethodName = compMethods[i];

//                console.log(compMethodName);

                currentContext.font = '.75em Verdana';
                currentContext.fillStyle = 'black';
//                currentContext.strokeStyle = 'grey';
                currentContext.fillText(compMethodName, 5, 15);
//                currentContext.strokeText(compMethodName, 5, 15);

                currentContext.fillStyle = 'blue';
                currentContext.fillRect(rects[0].x, rects[0].y, rects[0].width, rects[0].height);

                currentContext.globalCompositeOperation = compMethods[method];
                method += 1;

                currentContext.fillStyle = 'green';
                currentContext.fillRect(rects[1].x, rects[1].y, rects[1].width, rects[1].height);
            }

        }
    }
};
