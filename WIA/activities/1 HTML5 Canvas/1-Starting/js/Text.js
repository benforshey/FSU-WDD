window.onload = function() {
    var theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
    var ctx = theCanvas.getContext("2d");
       if (ctx) {
          var theString = "Drawing text on <canvas>";
           ctx.fillText(theString, 20, 20);

           ctx.font = '1em Georgia';
           ctx.fillStyle = 'blue';
           ctx.fillText(theString, 20, 60);

           ctx.font = '2em Verdana';
           ctx.fillStyle = 'blue';
//           ctx.textBaseline = 'middle';
           ctx.strokeStyle = 'rgba(0, 255, 0, .6)';
           ctx.fillText(theString, 20, 100);
           ctx.strokeText(theString, 20, 100);

        }
    }
};
